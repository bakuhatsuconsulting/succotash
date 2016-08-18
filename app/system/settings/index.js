'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */
import Electron from 'electron';
let remote = Electron.remote;
let fs = remote.require('fs');
let path = remote.require('path');
let file = path.join((process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']), ('.succotashrc'));
let settings;

try {
  settings = JSON.parse(fs.readFileSync(file, {encoding: 'UTF-8'}));
} catch(e) {
  fs.writeFileSync(file, '{}', {encoding: 'UTF-8'})
}

/**
 * 
 */
export default {get, set};

function get(name) {
  return settings; 
}

function set(key, val) {

}

