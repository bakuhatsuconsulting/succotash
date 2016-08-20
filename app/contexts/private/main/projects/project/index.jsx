'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';

export default class Project extends React.Component {
  constructor(props) {
    super();

    this.state = {project: props.project};
  }

  render() {
    return (
      <div className="col-xs-12 project">
      </div>
    )
  }
}