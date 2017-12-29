'use strict';

/***********************************************************************************************************************************************
 *
 ***********************************************************************************************************************************************
 * @description
 */

import React from 'react';
import Electron from 'electron';
import Settings from '~/app/system/settings';
import * as Security from '~/app/system/security';
import Projects from './projects';
import Domain from '~/app/domains/projects';
import SettingsView from '~/app/contexts/private/settings';
import * as Auth from '~/app/system/auth';

let Menu = Electron.remote.Menu;
let MenuItem = Electron.remote.MenuItem;

/**
 * [state description]
 * @type {Object}
 */
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
