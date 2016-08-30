'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';
import Dropdown from '../../../../../common/components/dropdown.jsx';
import Domain from '../../../../../domains/projects';
import Electron from 'electron';
import Events from 'pubsub-js';

let ipc = Electron.ipcRenderer;

/**
 * 
 */
export default class Project extends React.Component {
  constructor(props) {
    super();

    var self = this;
    this.all_tasks = props.data.tasks;
    this.state = {project: props.data.project, projects: props.data.projects, tasks: [], initialized: false};

    ipc.on('update-path', function(e, path) {
      path = path[0];

      if(!path) { return; } // report error here

      self.state.project.path = path;

      self.setState({project: self.state.project}, function() {
        Events.publish('Project:Updated', self.state.project);
      });
    });
  }

  componentWillMount() {
    var id = this.state.project['harvest.project'],
        self = this;

    if(!id || this.state.initialized) { 
      return; }


    this.loadTasks(id)
      .then(function() {
        self.setState({initialized: true});
      }).done();
  }

  updateProject(e) {
    e.persist();

    this.state.project[e.target.name] = e.target.value;
    Events.publish('Project:Updated', this.state.project);

    if(e.target.name === 'harvest.project') {
      this.loadTasks(this.state.project['harvest.project']);
    }
  }

  loadTasks(id) {
    var self = this;

    return Domain.tasks.get(id, this.props.data.tasks)
      .then(function(tasks) {
        self.setState({tasks: tasks});
      });
  }

  changePath() {
    ipc.send('open-file-dialog', 'update-path');
  }

  render() {
    let dom = (<div></div>);

    if(this.state.initialized) {
      dom = (
        <div className="col-xs-12 project margin-top__large">
          <div className="col-xs-9 center-y">
            <h4 onClick={this.changePath.bind(this)}>{this.state.project.path}</h4>
          </div>
          <div className="col-xs-3">
            <div className="col-xs-12">
              <Dropdown options={this.state.projects} initEmpty value='id' name="harvest.project" display='name' selected={{id: this.state.project['harvest.project']}} onSelect={this.updateProject.bind(this)}/>
            </div>
            <div className="col-xs-12 margin-top__large">
              <Dropdown options={this.state.tasks} initEmpty value='id' display='name' name="harvest.project.task" selected={{id: this.state.project['harvest.project.task']}} onSelect={this.updateProject.bind(this)}/>
            </div>
          </div>
        </div>
      )
    }

    return dom;
  }
}