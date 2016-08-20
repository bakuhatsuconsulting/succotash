'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */
const {app, BrowserWindow, ipcMain, dialog} = require('electron');

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

ipcMain.on('open-file-dialog', function(e) {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  }, function(files) {
    if(files) {e.sender.send('selected-directory', files)}
  });
});


