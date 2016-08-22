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

let settings = Security.decrypt(Settings.get('user'));
let Projects = new Resource('projects');
    Projects.find = new Resource('projects/:id');
    Projects.tasks = new Resource('projects/:id/task_assignments');

// let Projects = new Resource({})
let API = {
  get: getAllProjects,
  find: getProjectById,
  tasks: getTasksForProject
};

/**
 * 
 */
export default API;

/**
 * [getAllProjects description]
 * @return {[type]} [description]
 */
function getAllProjects() {
  return Projects.get()
    .then(function(data) {
      return data.map(function(n) { return n.project; });
    });
}

/**
 * [getProjectById description]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
function getProjectById(id) {

}

/**
 * [getProjectTasks description]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
function getTasksForProject(id) {

}