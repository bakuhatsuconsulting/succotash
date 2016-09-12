'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */
import Electron from 'electron';
import Settings from '../settings';
import moment from 'moment';
import Events from 'pubsub-js';

let remote = Electron.remote;
let watch = remote.require('watch');
let settings = {value: 10, units: 'minutes'};
let Watchers = {};

const durations = {
  minute: 1000*60,
  hour: 1000*60*60,
  day: 1000*60*60*24
};

const mappings = {
  minutes: durations.minute,
  hours: durations.hour,
  days: durations.day
};

setInterval(parseExpiries, durations.minute);

/**
 * 
 */
export default {activate, deactivate, clear};

/**
 * [activate description]
 * @param  {[type]}   path [description]
 * @param  {Function} fn   [description]
 * @return {[type]}        [description]
 */
function activate(path, fn) {

  watch.watchTree(path, function(f, curr, prev) {
    Watchers[path] = Number.MAX_SAFE_INTEGER;

    if (typeof f == "object" && prev === null && curr === null) {
      // Finished walking the tree
    } else if (prev === null) {
      Watchers[path] = Date.now();
      fn(f);
    } else if (curr.nlink === 0) {
      // f was removed
    } else {
      Watchers[path] = Date.now();
      fn(f);
    }
  });
}

/**
 * [deactivate description]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
function deactivate(path) {
  delete Watchers[path];

  watch.unwatchTree(path);
}

/**
 * [clear description]
 * @return {[type]} [description]
 */
function clear() {
  Object.keys(Watchers)
    .forEach(function(key) {
      deactivate(key);
    });
}

function parseExpiries() {
  let expiry = Settings.get('expiry') || settings;

  Object.keys(Watchers)
    .filter(function(path) {
      // if the current time is greater than the last active time plus expiry
      return Date.now() > Watchers[path] + (expiry.value * mappings[expiry.units]);
    }).forEach(function(path) {
      Events.publish('Timer:expired', path);
    });
}