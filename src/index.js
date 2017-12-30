'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - APP
 ***********************************************************************************************************************************************
 * @description
 */
import Router from './system/router';
import Settings from './system/settings';
import Views from './public';


/**
 * [router description]
 * @type {Router}
 */
const router = new Router();

/**
 * Init App
 */
Settings.init()
  .then(() => {router.register(Views).start('#/').set('/')})
  .catch(e => console.log(e));
