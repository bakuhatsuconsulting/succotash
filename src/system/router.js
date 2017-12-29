'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - SYSTEM - ROUTER
 ***********************************************************************************************************************************************
 * @description
 */
import Continuum from '@continuum/continuum';
import Identity from './identity';
import Constants from './constants';
// import Access from './access';

/**
 * Wraps Continuum.Router to provide custom auth and acl checks.
 */
export default class Router extends Continuum.Router {
  constructor() {
    super();
  }

  /**
   * Locks The view down based on 'authentication';
   * @param  {[type]} view   [description]
   * @param  {[type]} router [description]
   * @return {[type]}        [description]
   */
  protect(view, router) {
    return new Promise((resolve, reject) => {
      let identity = Identity.get();

      if(identity) {
        resolve();
      } else {
        router.setRoute(Constants.ROUTING.NO_AUTH);
      }
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
