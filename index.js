'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */
const {app, BrowserWindow} = require('electron');
app.harvest = require('harvest');
console.log(app)
// var remote = require('electron').remote;
// var electronFs = remote.require('fs');

let win;

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') { app.quit(); }
});

function createWindow() {
  win = new BrowserWindow({width: 800, height: 620});

  win.loadURL('file://'+__dirname+'/index.html', {
    nodeIntegration: true
  });

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}


