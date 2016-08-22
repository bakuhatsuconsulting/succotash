'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';
import Dropdown from '../../../../../common/components/dropdown.jsx';

export default class Project extends React.Component {
  constructor(props) {
    super();

    this.state = {project: props.data.project, projects: props.data.available, tasks: undefined};
  }

  render() {
    return (
      <div className="col-xs-12 project">
        <div className="col-xs-9">
          <h3>{this.state.project.path}</h3>
        </div>
        <div className="col-xs-3">
          <div className="col-xs-12">
            <Dropdown options={this.state.projects} initEmpty value='id' display='name' selected={{id: this.state.project.id}}/>
          </div>
        </div>
      </div>
    )
  }
}