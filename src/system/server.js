'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - SYSTEM - SERVER
 ***********************************************************************************************************************************************
 * @description
 */
import Server from 'json-server';
import Constants from './constants';
import DB from '~/db.json';
import path from 'path';
const server = Server.create();
const router = Server.router(DB);
const middlewares = Server.defaults({noCors:true});

server.use(middlewares);
server.use(router);

/**
 * [description]
 * @param  {[type]} port [description]
 * @return {[type]}      [description]
 */
export default function(port) {
  return new Promise((resolve, reject) => {
    server.listed(port, (err) => {
      if(err) {reject(err)}
        else { resolve(); }
    });
  })
}
