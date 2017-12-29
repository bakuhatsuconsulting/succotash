'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - SYSTEM - IDENTITY
 ***********************************************************************************************************************************************
 * @description
 */
import {Security} from '@continuum/continuum';
import Settings from './settings';

/**

 * @return {[type]} [description]
 */
export function get() {
  let token = Settings.get('user');
  let user;

  try {
    user = Security.decrypt(token);
  } catch(e) {
    // bad token
  }

  return user;
}

export default {get}
