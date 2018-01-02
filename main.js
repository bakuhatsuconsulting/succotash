'use strict';

/***********************************************************************************************************************************************
 *
 ***********************************************************************************************************************************************
 * @description
 */
var path = require('path');
var Server = require('json-server');
const SERVER_PORT = 27922;
const {app, BrowserWindow, ipcMain, dialog, Menu, globalShortcut, Tray} = require('electron');
const icon = path.join(__dirname, 'images', 'harvest-icon.png');
const server = Server.create()
const router = Server.router('db.json')
const middlewares = Server.defaults({noCors: true});

server.use(middlewares)
server.use(router)

let win;
let tray;

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  // if(process.platform !== 'darwin') { app.quit(); }
  console.log('all windows closed')
  app.quit();
});

app.on('will-quit', function() {
  globalShortcut.unregisterAll();
});

app.on('quit', () => {
  server.close();
})

function createWindow() {
  win = new BrowserWindow({width: 690, height: 620, title: 'Shit...', icon: icon});

  server.listen(SERVER_PORT, () => {
    win.loadURL(`file://${path.join(__dirname, 'dist', 'index.html')}`, {
      nodeIntegration: true
    });
  });

  win.on('close', function(e) {

  });

  win.on('minimize', function(e) {
    e.preventDefault();
    trayify();
  });

  win.on('restore', restore);

  win.on('blur', (e) => {
    globalShortcut.unregisterAll();
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
  try {
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
  } catch(e) {
    // unexpected exit
  }
}

function restore() {
  if(tray) {
    tray.destroy();
  }

  bindKeys();
  win.show();
}

function bindKeys() {
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
