'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - SYSTEM - IDENTITY
 ***********************************************************************************************************************************************
 * @description
 */
import {Security} from '@continuum/continuum';
import Settings from './settings';
const IDENTITY = 'user';

/**

 * @return {[type]} [description]
 */
export function get() {
  return Settings.get(IDENTITY)
}

export function set(user) {
  let data = {};
      data[IDENTITY] = user;

  return Settings.set(data);
}

export default {get, set}
