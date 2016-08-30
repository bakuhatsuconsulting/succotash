'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */
import * as Security from '../../system/security';
import Settings from '../../system/settings';
import Resource from '../../system/resource';
import q from 'q';

let user = Security.decrypt(Settings.get('user'));

let Tasks = new Resource('tasks');
    
// let Projects = new Resource({})
export default {
  get: getAllTasks
};

function getAllTasks() {
  var map = {};

  return Tasks.get()
    .then(function(tasks) {
      tasks.forEach(function(t) {
        map[t.task.id] = t.task;
      });

      return map;
    });
}

