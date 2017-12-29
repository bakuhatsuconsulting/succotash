'use strict';

/***********************************************************************************************************************************************
 *
 ***********************************************************************************************************************************************
 * @description
 */
import Electron from 'electron';
import React from 'react';
import Loader from '~/app/common/components/loader';
import Project from './project';
import Domain from '~/app/domains/projects';
import Tasks from '~/app/domains/tasks';
import Settings from '~/app/system/settings';
import * as Security from '~/app/system/security';
import Events from 'pubsub-js';

let ipc = Electron.ipcRenderer;

export default class Projects extends React.Component {
  constructor(props) {
    super();

    var self = this;

    this.state = {projects: props.data || [], available: []};
    this.user = Security.decrypt(Settings.get('user'));

    ipc.on('selected-directory', function(e, path) {
      self.add(path);
    });

    Events.subscribe('Project:Updated', function(e, project) {
      self.save();
    });

    Events.subscribe('Project:removed', function(e, project) {
      self.remove(project);
    });
  }

  componentWillMount() {
    var self = this;

    Domain.get()
      .then(function(data) {
        self.setState({available: data});
      }).then(Tasks.get)
        .then(function(tasks) {
          self.setState({tasks: tasks, initialized: true})
        }).catch(function(err) {
        self.setState({error: 'There was an error retrieving your Harvest data. You may not have premission to access these resources. Talk to your Harvest administrator.', initialized: true});
      }).done();
  }

  choose() {
    ipc.send('open-file-dialog');
  }

  add(path) {
    var self = this;

    path = path[0];

    if(!path) { return; }

    this.state.projects.unshift({id: Date.now(), path: path, domain: this.user.domain});

    this.setState({projects: this.state.projects}, function() {
      self.save();
    });
  }

  save() {
    Domain.local.save(this.state.projects);
  }

  remove(project) {
    var self = this;

    Domain.local.remove(project)
      .then(function(projects) {
        self.setState({projects: projects});
      });
  }

  render() {
    var self = this;

    if(!this.state.initialized) {
      return (<div className="row content-main">
        <Loader />
      </div>);
    }

    return (
      <div className="col-xs-12 projects">
        <div className="col-xs-12 projects-header gutterless">
          <div className="col-xs-9 gutterless">
            <h3>Projects</h3>
          </div>
          <div className="col-xs-3 right gutterless">
            <button className="btn btn-default" disabled={this.state.error} onClick={this.choose.bind(this)}>Add a project <i className="glyphicon glyphicon-plus-sign pointy"></i></button>
          </div>
        </div>
        {
          (function() {
            if(self.state.error) {
              return <p className="col-xs-12 center margin-top__large">{self.state.error}</p>
            } else {
              return (
                self.state.projects.map(function(project, idx) {
                  return (
                    <Project data={{project: project, projects: self.state.available, tasks: self.state.tasks}} key={project.path} />
                  )
                })
              )
            }
          })()
        }
      </div>
    )
  }
}
