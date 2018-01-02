'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - DOMAINS - PROJECTS - REMOTE
 ***********************************************************************************************************************************************
 * @description
 */
import {Domain} from '@continuum/continuum';
import Model from './projects.remote.model';
import Resource from './projects.remote.resource';
import Service from './projects.remote.service';

/**
 * Remote Projects Domain
 */
const domain = new Domain('projects', {Resource, Model, Service}, {type: Array});
const MAX_RESPONSE_LENGTH = 100;

/**
 * Remote Projects GET orchestrator
 * @param  {Object} [config={}] [description]
 * @return {[type]}             [description]
 */
domain.get = function(config={}) {
  let page = 1;

  return new Promise((resolve, reject) => {
    this.Store.get()
      .then(resolve, (err) => {
        this.Resource.get(config)
          .then(response => {
            return Promise.all(buildProjectQueries.call(this, config, response));
          }).then(this.Service.inbound.get)
          .then(projects => projects.map(project => this.Model.validate(project, config)))
          .then(this.Store.set)
          .then(this.Store.dispatch);
      }).catch(reject); // add system-wide custom class
  });
}

/**
 * Aggregates Possible project pages from harvest api into one result set.
 * @param  {Object} [config={}]   [description]
 * @param  {Object} [response={}] [description]
 * @return {[type]}               [description]
 */
function buildProjectQueries(config={}, response={}) {
  let projects = [response];

  Array.apply(null, Array(response.total_pages || 0))
    .forEach((num, idx) => {
      projects.push(this.Resource.get(Object.assign({config}, {params: {page: idx+2}})));
    });

  return projects;
}

/**
 * Projects remote domain export
 */
export default domain;
