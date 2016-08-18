'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */
import Electron from 'electron';
import q from 'q';

let remote = Electron.remote;
// let Harvest = remote.require('harvest');
let oAuth = remote.require('electron-oAuth2');
let harvest;
let code;
let token;

/**
 * 
 */
export default {authenticate};

/**
 * [authenticate description]
 * @param  {[type]} creds [description]
 * @return {[type]}       [description]
 */
function authenticate(creds) {
  let def = q.defer();
  let config = {
    clientId: creds.identifier,
    clientSecret: creds.secret,
    authorizationUrl: 'https://'+creds.subdomain+'.harvestapp.com/oauth2/authorize',
    tokenUrl: 'https://'+creds.subdomain+'.harvestapp.com/oauth2/token',
    useBasicAuthorizationHeader: false,
    redirectUri: 'http://localhost'
  };

  let win = {
    alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false
    }
  };

  harvest = oAuth(config, win);

  harvest.getAccessToken()
    .then(function(data) {
      console.log(data);
    });

  return def.promise;
}