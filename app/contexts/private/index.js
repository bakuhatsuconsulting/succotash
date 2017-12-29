'use strict';

/***********************************************************************************************************************************************
 *
 ***********************************************************************************************************************************************
 * @description
 */

import Main from './main';
import Settings from './settings/index';
import Events from 'pubsub-js';
import Electron from 'electron';
import * as Auth from '~/app/system/auth';
import React from 'react';

let Menu = Electron.remote.Menu;
let MenuItem = Electron.remote.MenuItem;

// Set main private menu
let menu = new Menu();
menu.append(new MenuItem({label: 'Projects', click: loadProjects}));
menu.append(new MenuItem({label: 'Settings', click: loadSettings}));
menu.append(new MenuItem({label: 'Log Out', click: logout}));
Menu.setApplicationMenu(menu);

/**
 *
 */
export default {Main, Settings};

function loadSettings() {
  Events.publish('content', <Settings />)
}

function loadProjects() {
  Events.publish('content', <Main />)
}

function logout(item, win) {
  Auth.logout()
      .then(function() {
        win.reload();
      });
}
