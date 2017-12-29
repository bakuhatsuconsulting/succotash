'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - PUBLIC
 ***********************************************************************************************************************************************
 * @description
 */

import View from '~/src/system/view';
import Router from '~/src/system/router';
import Settings from '~/src/system/settings';
import '~/src/assets/styles/main.css';

//
// VIEWS
//------------------------------------------------------------------------------------------//
// @description
//

import main from './main';
import login from './login';


/**
 *
 */
const views = [
  new View('/', main, {protected: true}),
  new View('/login', login, {protected: false})
];

/**
 * [router description]
 * @type {Router}
 */
const router = new Router();

/**
 * Init App
 */
Settings.init().then(() => {router.register(views).start('#/').set('/')})
  .catch(e => console.log(e));
