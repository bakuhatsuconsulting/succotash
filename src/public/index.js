'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - PUBLIC
 ***********************************************************************************************************************************************
 * @description
 */

import View from '~/src/system/view';
import Router from '~/src/system/router';
import Settings from '~/src/system/settings';
import 'react-select/dist/react-select.css';
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
export default [
  new View('/', main, {protected: true}),
  new View('/login', login, {protected: false})
];
