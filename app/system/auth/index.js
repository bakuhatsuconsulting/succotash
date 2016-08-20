'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */

import Electron from 'electron';
import q from 'q';

let INSTANCE;
let remote = Electron.remote;
let oAuth = require('./oauth');
let basic = require('./basic');
let harvest;
let code;
let token;
let strategies = {
  basic: basic,
  oAuth: oAuth
};


/**
 * API
 */
export default class Auth {
  constructor(settings) {
    this.settings = settings;
    this.settings.api = 'https://'+settings.domain+'.harvestapp.com';
    this.authentication = settings.email && settings.password? new basic(settings) : oAuth.call(settings);
    
    return this;
  }

  login(creds) {
    return this.authentication.login();
  }
}

export function logout() {
  
}
