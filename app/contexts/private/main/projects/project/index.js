'use strict';

/***********************************************************************************************************************************************
 *
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';
import Dropdown from '~/app/common/components/dropdown';
import Loader from '~/app/common/components/loader';
import Projects from '~/app/domains/projects';
import Timers from '~/app/domains/timers';
import Watch from '~/app/system/watch';
import Electron from 'electron';
import Events from 'pubsub-js';
import _ from 'lodash';
import moment from 'moment';

let ipc = Electron.ipcRenderer;

/**
 *
 */
export default class Project extends React.Component {
  constructor(props) {
    super();

    var self = this;
    this.all_tasks = props.data.tasks;
    this.state = {project: props.data.project, projects: props.data.projects, tasks: [], initialized: false, timer: undefined};

    ipc.on(props.data.project.id, function(e, path) {
      path = path[0];

      if(!path) { return; } // report error here
      Watch.deactivate(this.state.project.path);

      self.watch(path);
      this.state.project.path = path;
      self.setState({project: self.state.project}, function() {
        Events.publish('Project:Updated', self.state.project);
      });
    });

    this.timerSub = Events.subscribe('Timer:activated', function(name, data) {
      if(data.project === self.state.project.id) { return; }
      self.state.timer.active = false;
      self.setState({timer: self.state.timer});
    });

    if(this.state.project.path) {
      this.watch(this.state.project.path);
    }

    this.exipred = Events.subscribe('Timer:expired', function(e, path) {
      if(path !== self.state.project.path) { return; }

      self.state.timer.active = true;
      self.toggleTimer();
    });

  }

  componentWillMount() {
    var id = this.state.project['harvest.project'];

    if(!id || this.state.initialized) {
      return this.setState({initialized: true, timer: {active: false}});
    }

    this.load(id);
  }

  fsChange(e, file) {
    if(!this.state.timer.active) {
      this.toggleTimer();
    }
  }

  watch(path) {
    Watch.activate(path, this.fsChange.bind(this));
  }

  updateProject(e) {
    var self = this;

    e.persist();

    this.state.project[e.target.name] = e.target.value;

    if(e.target.name === 'harvest.project') {
      this.loadTasks(this.state.project['harvest.project']);
    }

    this.setState({project: this.state.project}, function() {
      Events.publish('Project:Updated', self.state.project);
    });
  }

  load(id) {
    var self = this;

    this.loadTasks(id)
      .then(this.loadEntries(id), this.loadEntries(id))
      .then(function() {
        self.setState({initialized: true});
      }).done();
  }

  loadTasks(id) {
    return new Promise((resolve, reject) => {
      if(!id) {
        resolve();
      } else {
        Projects.tasks.get(id, this.props.data.tasks)
          .then((tasks) => {
            resolve(this.setState({tasks: tasks}));
          });
      }
    });
  }

  isActive(timer) {
    var active = false;

    if(timer.hasOwnProperty('hours_with_timer')) {
      active = true;
    } else {
      if(timer.hours !== timer.hours_without_timer) {
        active = true;
      }
    }

    return active;
  }

  loadEntries(id) {
    var self = this;

    return new Promise((resolve, reject) => {
      if(!this.state.project['harvest.timer.entry']) { resolve(this.setState({timer: {active: false}})); }
        else {
          Timers.get(this.state.project['harvest.timer.entry'])
            .then((entry) => {
              entry.active = this.isActive(entry);
              this.setState({timer: entry});
            }, function(err) {
              // err
            }).then(resolve);
        }

    });
  }

  changePath() {
    ipc.send('open-file-dialog', this.state.project.id);
  }

  toggleTimer() {
    var self = this;
    var existing = !!this.state.timer.id;
    var active = !!this.state.timer.active;

    if(existing) {
      Timers.toggle(this.state.timer.id)
        .then(function(timer) {
          timer.active = !active;
          self.setState({timer: timer});
        }).then(function() {
          Events.publish('Timer:activated', {project: self.state.project.id, active: self.state.timer.active});
        });
    } else {
      Timers.start({task_id: this.state.project['harvest.project.task'], project_id: this.state.project['harvest.project']})
        .then(function(timer) {
          timer.active = true;
          self.state.project['harvest.timer.entry'] = timer.id;
          self.setState({timer: timer, project: self.state.project}, function() {
            Events.publish('Project:Updated', self.state.project);
            Events.publish('Timer:activated', {project: self.state.project.id, active: self.state.timer.active});
          });
        });
    }
  }

  canChangeHarvestInfo() {
    return !!this.state.timer.active;
  }

  removeProject() {
    Events.unsubscribe(this.timerSub);
    Watch.deactivate(this.state.project.path);

    if(this.state.timer.active) {
      this.toggleTimer();
    }

    Events.publish('Project:removed', this.state.project);
  }

  render() {
    var self = this;

     var dom = (
        <div className="col-xs-12 project margin-top__large">
          <div className="col-xs-6 center-y">
            <h4 onClick={this.changePath.bind(this)}>{this.state.project.path}</h4>
          </div>
          <div className="col-xs-3 relative">
          {(function() {
            if(self.state.initialized) {
              return (
                <div>
                  <div className="col-xs-12">
                    <Dropdown disabled={self.canChangeHarvestInfo.bind(self)} options={self.state.projects} initEmpty value='id' name="harvest.project" display='name' selected={{id: self.state.project['harvest.project']}} onSelect={self.updateProject.bind(self)}/>

                  </div>
                  <div className="col-xs-12 margin-top__large">
                    <Dropdown disabled={self.canChangeHarvestInfo.bind(self)} options={self.state.tasks} initEmpty value='task_id' display='name' name="harvest.project.task" selected={{task_id: self.state.project['harvest.project.task']}} onSelect={self.updateProject.bind(self)}/>
                  </div>
                </div>
              )
            } else {
              return (
                  <div className="margin-top__large">
                    <Loader type="small" />
                  </div>
                )
            }
          })()}
          </div>
          <div className="col-xs-3">
            <div>
              {(function() {
                if(self.state.timer) {
                  return (
                    <div>
                      <button disabled={!self.state.project['harvest.project'] || !self.state.project['harvest.project.task']} className={'btn form-control '+ (self.state.timer.active? 'btn-danger' : 'btn-success')} onClick={self.toggleTimer.bind(self)}>{self.state.timer.active? 'Stop Timer' : 'Start Timer'}</button>
                      <button disabled={self.state.timer.active} className="btn btn-warning form-control margin-top__large" onClick={self.removeProject.bind(self)}>Delete Project</button>
                    </div>
                    )
                }

                return (
                  <div className="margin-top__large">
                    <Loader type="small" height="50px"/>
                  </div>
                  )
              })()}

            </div>
          </div>
        </div>
      )

    return dom;
  }
}
