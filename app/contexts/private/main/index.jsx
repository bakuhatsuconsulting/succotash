'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */

import React from 'react';
import Settings from '../../../system/settings';
import Projects from './projects/index.jsx';

export default class Main extends React.Component {
  constructor() {
    super();

    this.state = {projects: Settings.get('projects') || []};
  }

  render() {
    return (
      <div className="col-xs-12 content-main">
        <Projects data={this.state.projects} />
      </div>
    );
  }
}