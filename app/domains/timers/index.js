'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */
import * as Security from '../../system/security';
import Settings from '../../system/settings';
import Resource from '../../system/resource';
import moment from 'moment';
import q from 'q';

let Timers = {
  start: new Resource('daily/add'), 
  stop: new Resource('daily/delete/:id'), 
  toggle: new Resource('daily/timer/:id'),
  get: new Resource('daily/show/:id')};

export default {
  start:  startTimer,
  stop: stopTimer,
  toggle: toggleTimer,
  get: getTimer
};

function startTimer(data) {
  data.spent_at = moment().format('YYYY-MM-DD');
  return Timers.start.post({}, data);
}

function stopTimer() {
  return Timers.get();
}

function toggleTimer(id) {
  return Timers.toggle.get({id: id});
}

function getTimer(id) {
  return Timers.get.get({id: id});
}