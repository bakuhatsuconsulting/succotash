'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */
var path = require('path');
const {app, BrowserWindow, ipcMain, dialog, Menu, globalShortcut, Tray} = require('electron');
const icon = path.join(__dirname, 'images', 'harvest-icon.png');


let win;
let tray;

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') { app.quit(); }
});

app.on('will-quit', function() {
  globalShortcut.unregisterAll();
});

function createWindow() {
  win = new BrowserWindow({width: 690, height: 620, title: 'Shit...', icon: icon});

  win.loadURL('file://'+__dirname+'/index.html', {
    nodeIntegration: true
  });

  win.on('close', function(e) {
    e.preventDefault();
    win.hide();
    trayify();
  });

  win.on('minimize', function(e) {
    e.preventDefault();
    trayify();
  });

  win.on('restore', function() {
    if(tray) { tray.destroy(); }
  });

  // globalShortcut.register('CommandOrControl+R', win.reload);
  globalShortcut.register('CommandOrControl+Shift+R', function() {
    win.reload();
  });

  globalShortcut.register('CommandOrControl+R', function() {
    win.reload();
  });

  globalShortcut.register('CommandOrControl+Shift+I', function() {
    win.webContents.openDevTools();
  });
}

ipcMain.on('open-file-dialog', function(e, data) {
  data = data || 'selected-directory';

  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory'] 
  }, function(files) {
    if(files) {e.sender.send(data, files); }
  });
});

/**
 * [trayify description]
 * @return {[type]} [description]
 */
function trayify() {
  tray = new Tray(icon);
  var menu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      click: function() {
        tray.destroy();
        win.removeAllListeners();
        app.quit();
      }
    },
    {
      label: 'Restore',
      click: restore
    }
  ]);

  tray.setToolTip('Fucking Harvest...');
  tray.setContextMenu(menu);
  tray.on('click', function() { restore(); });
  tray.on('double-click', function() { restore(); });
}

function restore() {
  tray.destroy();
  // win.restore();
  win.show();
}