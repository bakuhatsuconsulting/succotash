'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - DOMAINS - PROJECTS - REMOTE - SERVICE
 ***********************************************************************************************************************************************
 * @description
 */
import {Service} from '@continuum/continuum';

const service = new Service({});
const projects_key = 'project_assignments';

/**
 * Custom projects transform
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
service.inbound.get = function(data) {
  let projects = [];

  data.forEach(response => projects = projects.concat(response.data[projects_key]))

  let keys = ((data[0] || {}).data || {});

  Object.keys(keys).filter(key => key !== projects_key)
    .forEach(key => projects[key] = keys[key]);

  return projects;
}

/**
 * Service export
 */
export default service;
