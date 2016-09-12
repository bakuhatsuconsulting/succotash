'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */

import React from 'react';
import Electron from 'electron';
import Settings from '../../../system/settings';
import * as Security from '../../../system/security';
import Projects from './projects/index.jsx';
import Domain from '../../../domains/projects';
import SettingsView from '../settings/index.jsx';
import * as Auth from '../../../system/auth';

let Menu = Electron.remote.Menu;
let MenuItem = Electron.remote.MenuItem;

export default class Main extends React.Component {
  constructor() {
    super();

    this.state = {projects: Domain.local.get(), tasks: []};
  }

  loadSettings() {
    
  }

  logout(itm, win) {
    
  }

  render() {
    return (
      <div className="col-xs-12 content-main">
        <Projects data={this.state.projects} />
      </div>
    );
  }
}