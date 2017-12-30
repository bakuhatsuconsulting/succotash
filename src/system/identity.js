'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - SYSTEM - IDENTITY
 ***********************************************************************************************************************************************
 * @description
 */
import {Security} from '@continuum/continuum';
import Settings from './settings';
const TOKEN = 'identity';

/**

 * @return {[type]} [description]
 */
export function get() {
  let token = Settings.get(TOKEN);
  let user;

  try {
    user = Security.decrypt(token);
  } catch(e) {
    // bad token
  }

  return user;
}

export function set(user) {
  let token = Security.encrypt(user);
  return Settings.set(TOKEN, token);
}

export default {get}
