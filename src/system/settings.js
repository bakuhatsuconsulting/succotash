'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - SYSTEM - SETTINGS
 ***********************************************************************************************************************************************
 * @description
 */
import Electron from 'electron';
import Constants from './constants';
import _ from 'lodash';


let remote = Electron.remote;
let fs = remote.require('fs');
let path = remote.require('path');
let file = path.join((process.env[Constants.HOME_DIR[process.platform] || Constants.HOME_DIR.default], Constants.SETTINGS_FILE);

/**
 * [settings description]
 * @type {Object}
 */
const settings = {};


/**
 *
 */
export default {get, set, init};

/**
 * [init description]
 * @return {[type]} [description]
 */
function init() {
  return new Promise((resolve, reject) => {
    fs.readFile(file, {encoding: 'UTF-8'}, function(err, file) {
      if(err) {
        create().then(resolve, reject);
      } else {
        try {
          Object.assign(settings, JSON.parse(file));
        } catch(e) {
          // no op
        }

        resolve(settings);
      }
    });
  });
}

/**
 * [get description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function get(name) {
  return name && settings[name] || !name && _.merge({}, settings);
}

/**
 * [set description]
 * @param {[type]} data [description]
 */
function set(data) {
  return new Promise((resolve, reject) => {
    if(!data || data && data.constructor !== Object) {
      reject('You must pass in an object');
    } else {
      fs.writeFile(file, JSON.stringify(Object.assign(settings, data)), {encoding: 'UTF-8'}, function(err) {
        if(err) {
          reject(err);
        } else {
          resolve(settings);
        }
      });
    }
  })
}

/**
 * [create description]
 * @return {[type]} [description]
 */
function create() {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, '{}', {encoding: 'UTF-8'}, function(err) {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    })
  });
}
