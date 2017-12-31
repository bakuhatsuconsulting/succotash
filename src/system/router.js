'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - SYSTEM - ROUTER
 ***********************************************************************************************************************************************
 * @description
 */
import Continuum from '@continuum/continuum';
import Identity from './identity';
import Constants from './constants';
import Settings from './settings';
import Authentication from './authentication';
// import Access from './access';

/**
 * Wraps Continuum.Router to provide custom auth and acl checks.
 */
export default class Router extends Continuum.Router {
  constructor() {
    super();

    console.log(this.set)
  }

  /**
   * Locks The view down based on 'authentication';
   * @param  {[type]} view   [description]
   * @param  {[type]} router [description]
   * @return {[type]}        [description]
   */
  protect(view, router) {
    return new Promise((resolve, reject) => {
      let creds = {ACCOUNT_ID: Settings.get('ACCOUNT_ID'), token: Settings.get('token')};

      Authentication.login(creds)
        .then(resolve)
        .catch(err =>  router.setRoute('#/login'));
    });
  }

  /**
   * Here we know _who_ the user is, now to check to see if they can access this view.
   * @param  {[type]} view [description]
   * @return {[type]}      [description]
   */
  restrict(view) {
    return true;
  }
}
