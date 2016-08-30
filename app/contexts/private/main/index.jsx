'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */

import React from 'react';
import Settings from '../../../system/settings';
import Projects from './projects/index.jsx';
import Domain from '../../../domains/projects';

export default class Main extends React.Component {
  constructor() {
    super();

    this.state = {projects: Domain.local.get(), tasks: []};
  }

  componentWillMount() {

  }

  render() {
    return (
      <div className="col-xs-12 content-main">
        <Projects data={this.state.projects} />
      </div>
    );
  }
}