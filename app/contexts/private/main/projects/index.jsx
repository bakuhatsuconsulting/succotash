'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */
import Electron from 'electron';
import React from 'react';
import Loader from '../../../../common/components/loader.jsx';
import Project from './project';
import Domain from '../../../../domains/projects';
import Tasks from '../../../../domains/tasks';
import Events from 'pubsub-js';

let ipc = Electron.ipcRenderer;

export default class Projects extends React.Component {
  constructor(props) {
    super();

    var self = this;

    this.state = {projects: props.data || [], available: []};

    ipc.on('selected-directory', function(e, path) {
      self.add(path);
    });

    Events.subscribe('Project:Updated', function(e, project) {
      console.log(self.state)
      self.save();
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
        console.log(err);
      }).done();
  }

  choose() {
    ipc.send('open-file-dialog');
  }

  add(path) {
    var self = this;

    path = path[0];

    if(!path) { return; }

    var projects = [{id: Math.random().toString(32).substr(2, 16), path: path}].concat(this.state.projects);

    this.setState({projects: projects}, function() {
      self.save();
    });
  }

  save() {
    Domain.local.save(this.state.projects);
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
            <button className="btn btn-default" onClick={this.choose.bind(this)}>Add a project <i className="glyphicon glyphicon-plus-sign pointy"></i></button>
          </div>
        </div>
        {
          this.state.projects.map(function(project, idx) {
            return (
              <Project data={{project: project, projects: self.state.available, tasks: self.state.tasks}} key={project.path} />
            )
          })
        }
      </div>
    )    
  }
}