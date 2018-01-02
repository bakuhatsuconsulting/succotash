'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - DOMAINS - PROJECTS - REMOTE - RESOURCE
 ***********************************************************************************************************************************************
 * @description
 */
import {Resource} from '@continuum/continuum';
import Constants from '~/src/system/constants';

/**
 * Harvest Projects Resource
 */
export default new Resource('users/me/project_assignments', {
  base: Constants.HARVEST_API
});
