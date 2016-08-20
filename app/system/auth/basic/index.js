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
    this.authorization = btoa(settings.email +':' + settings.password);
    this.test = new Resource({url: settings.api, name: 'account/who_am_i', authorization: this.authorization});
    return this;
  }

  login() {
    return this.test.get(); 
  }
}