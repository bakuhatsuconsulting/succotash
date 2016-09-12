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
import moment from 'moment';
import _ from 'lodash';

const User = Security.decrypt(Settings.get('user'));

let Projects = new Resource('projects');
    Projects.find = new Resource('projects/:id');
    Projects.tasks = new Resource('projects/:id/task_assignments');
    Projects.entries = new Resource('projects/:id/entries?from=19700101&to=' + moment().format('YYYYMMDD'));

// let Projects = new Resource({})
let API = {
  get: getAllProjects,
  find: getProjectById,
  tasks: {
    get: getTasksForProject},
  local: {
    get: getLocalProjects,
    save: saveLocalProjects,
    remove: removeLocalProject
  },
  entries: {
    get: getProjectEntries
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
 * [getProjectEntries description]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
function getProjectEntries(id) {
  return Projects.entries.get({id: id})
    .then(function(entries) {
      return entries.map(function(e) { return e.day_entry});
    }, function(err) {
      console.log(err)
    });
}

/**
 * [getProjectTasks description]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
function getTasksForProject(id, all) {
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
    .filter(function(p) {return p.domain === User.domain})
    .map(function(p) {
      p['harvest.project'] = parseInt(p['harvest.project']);
      p['harvest.project.task'] = parseInt(p['harvest.project.task']);
      return p;
    });
}

/**
 * [removeLocalProject description]
 * @param  {[type]} project [description]
 * @return {[type]}         [description]
 */
function removeLocalProject(project) {
  var def = q.defer();

  var projects = Settings.get('projects');

  _.remove(projects, function(n) {
    return n.id === project.id;
  });

  Settings.set({projects: projects});

  def.resolve(projects);

  return def.promise;
}

/**
 * [normalizeTasks description]
 * @param  {[type]} tasks [description]
 * @param  {[type]} all   [description]
 * @return {[type]}       [description]
 */
function normalizeTasks(tasks, all) {

}