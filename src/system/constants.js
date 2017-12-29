'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - SYSTEM - CONSTANTS
 ***********************************************************************************************************************************************
 * @description
 */
const path = require('path');

/**
 * [HOME_DIR description]
 * @type {Object}
 */
export default {
  HOME_DIR: {
    win32: 'USERPROFILE',
    darwin: 'HOME',
    default: 'HOME'
  },
  SETTINGS_FILE: '.succotashrc',
  JSON_DB: 'db.json',
  ROUTING: {
    NO_AUTH: '#/login',
    NO_ACCESS: '#/'
  }
}
