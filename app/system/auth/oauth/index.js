'use strict';

/***********************************************************************************************************************************************
 *
 ***********************************************************************************************************************************************
 * @description
 */
import Electron from 'electron';
import q from 'q';
import oAuth from '~/scripts/oauth';

export default {login}

function login(creds) {
  let config = {
    clientId: creds.identifier,
    clientSecret: creds.secret,
    authorizationUrl: 'https://'+creds.subdomain+'.harvestapp.com/oauth2/authorize',
    tokenUrl: 'https://'+creds.subdomain+'.harvestapp.com/oauth2/token',
    useBasicAuthorizationHeader: false,
    redirectUri: 'http://localhost/callback'
  };

  let win = {
    alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false
    }
  };

  harvest = oAuth(config, win);

  return harvest.getAccessToken()
    .then(function(data) {
      console.log(data);
    });

}
