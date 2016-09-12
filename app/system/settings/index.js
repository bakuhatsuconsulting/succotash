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


/**
 * 
 */
export default {get, set, init};

function init() {
  var def = q.defer();

    fs.readFile(file, {encoding: 'UTF-8'}, function(err, file) {
      if(err) {
        create().then(def.resolve, def.reject);
      } else {
        try {
          settings = JSON.parse(file);
        } catch(e) {
          // no op
        }

        def.resolve(settings);
      }
    });

  return def.promise;
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
  let def = q.defer();


  if(!data || data && data.constructor !== Object) {
    def.reject('You must pass in an object');
  } else {
    fs.writeFile(file, JSON.stringify(merge(settings, data)), {encoding: 'UTF-8'}, function(err) {
      if(err) {
        def.reject(err);
      } else {
        def.resolve(settings);
      }
    });
  }

  return def.promise;
}

/**
 * [create description]
 * @return {[type]} [description]
 */
function create() {
  var def = q.defer();

  fs.writeFile(file, '{}', {encoding: 'UTF-8'}, function(err) {
    if(err) {
      def.jeject(err);
    } else {
      def.resolve();
    }
  })

  return def.promise;
}

/**
 * [merge description]
 * @param  {[type]} settings [description]
 * @param  {[type]} data     [description]
 * @return {[type]}          [description]
 */
function merge(settings, data) {
  Object.keys(data || {})
    .forEach(function(key) {
      settings[key] = data[key];
    });

  return settings;
}

