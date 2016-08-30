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

let Projects = new Resource('projects');
    Projects.find = new Resource('projects/:id');
    Projects.tasks = new Resource('projects/:id/task_assignments');

// let Projects = new Resource({})
let API = {
  get: getAllProjects,
  find: getProjectById,
  tasks: {
    get: getTasksForProject},
  local: {
    get: getLocalProjects,
    save: saveLocalProjects
  }
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
function getTasksForProject(id, all) {
  console.log(id, all)
  return Projects.tasks.get({id: id})
    .then(function(tasks) {
      return tasks.map(function(t) {
        t.task_assignment.name = all[t.task_assignment.task_id].name;

        return t.task_assignment
      })
    });
}

/**
 * [saveProjects description]
 * @return {[type]} [description]
 */
function saveLocalProjects(data) {
  return Settings.set({projects: data || []});
}

/**
 * [getLocalProjects description]
 * @return {[type]} [description]
 */
function getLocalProjects() {
  return (Settings.get('projects') || [])
    .map(function(p) {
      p['harvest.project'] = parseInt(p['harvest.project']);
      p['harvest.project.task'] = parseInt(p['harvest.project.task']);
      return p;
    });
}

/**
 * [normalizeTasks description]
 * @param  {[type]} tasks [description]
 * @param  {[type]} all   [description]
 * @return {[type]}       [description]
 */
function normalizeTasks(tasks, all) {

}