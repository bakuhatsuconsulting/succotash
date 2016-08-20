'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */
import Electron from 'electron';
import _ from 'lodash';
import q from 'q';

let remote = Electron.remote;
let fs = remote.require('fs');
let path = remote.require('path');
let file = path.join((process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']), ('.succotashrc'));
let settings = {};


try {
  settings = JSON.parse(fs.readFileSync(file, {encoding: 'UTF-8'}));
} catch(e) {
  fs.writeFileSync(file, '{}', {encoding: 'UTF-8'});
}

/**
 * 
 */
export default {get, set};

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
  let def = q.defer();

  fs.writeFile(file, JSON.stringify(_.merge(settings, (data || {}))), {encoding: 'UTF-8'}, function(err) {
    if(err) {
      def.reject(err);
    } else {
      def.resolve(settings);
    }
  });

  return def.promise;
}

