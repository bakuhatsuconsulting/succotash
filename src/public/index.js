'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - PUBLIC
 ***********************************************************************************************************************************************
 * @description
 */

import View from '~/src/system/view';
import Router from '~/src/system/router';

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
 * Init Router
 */
new Router().register(views).start('#/');
