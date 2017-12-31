'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - SYSTEM - AUTHENTICATION
 ***********************************************************************************************************************************************
 * @description
 */

import Continuum from '@continuum/continuum';
import Constants from './constants';
import Axios from 'axios';


/**
 * [login description]
 * @return {[type]} [description]
 */
export function login(creds) {
  return Axios.get(`${Constants.HARVEST_API}/users/me`, {headers: {'Authorization': 'Bearer ' + creds.token, 'Harvest-Account-ID': creds.ACCOUNT_ID}});
}

/**
 * [logout description]
 * @return {[type]} [description]
 */
export function logout() {

}

export default {login, logout}
