'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */
import q from 'q';
import Resource from '../../resource';

export default class Basic {
  constructor(settings) {
    this.test = new Resource('account/who_am_i', {settings: settings});
    return this;
  }

  login() {
    return this.test.get(); 
  }
}