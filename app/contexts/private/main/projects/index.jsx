'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */
import Electron from 'electron';
import React from 'react';
import Project from './project';

let ipc = Electron.ipcRenderer;

export default class Projects extends React.Component {
  constructor(props) {
    super();

    this.state = {projects: props.data || []};
    ipc.on('selected-directory', function(e, path) {
      console.log(e, path);
    })
  }

  add() {
    console.log('add')
    ipc.send('open-file-dialog');
  }

  render() {
    return (
      <div className="col-xs-12 projects">
        <div className="col-xs-12 projects-header gutterless">
          <div className="col-xs-9 gutterless">
            <h3>Projects</h3>
          </div>
          <div className="col-xs-3 right gutterless">
            <button className="btn btn-default" onClick={this.add.bind(this)}>Add a project <i className="glyphicon glyphicon-plus-sign pointy"></i></button>
          </div>
        </div>
        {
          this.state.projects.map(function(project, idx) {
            return (
              <Project data={project} key={idx} />
            )
          })
        }
      </div>
    )    
  }
}