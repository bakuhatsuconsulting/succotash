'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - DOMAINS - PROJECTS - REMOTE - SERVICE
 ***********************************************************************************************************************************************
 * @description
 */
import {Service} from '@continuum/continuum';

const service = new Service({});
const projects_key = 'project_assignments';
const tasks_key = 'task_assignments';

/**
 * Custom projects transform
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
service.inbound.get = function(data) {
  let projects = [];

  // Essentially flattens projects array
  data.forEach(response => projects = projects.concat(response.data[projects_key]))

  let keys = ((data[0] || {}).data || {});

  // Reapply the source response properties to the new projects array
  Object.keys(keys).filter(key => key !== projects_key)
    .forEach(key => projects[key] = keys[key]);

  // Loop through projects and structure data desirable for the UI.
  projects.forEach(project => {
    project.name = project.project.name;

    project[tasks_key].forEach(task => {
      task.name = task.task.name;
    });
  });


  return projects;
}

/**
 * Service export
 */
export default service;
