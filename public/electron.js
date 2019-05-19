const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;

const path = require('path');
const isDev = require('electron-is-dev');

let splashWindow;
let mainWindow;

function createSplashWindow () {
  splashWindow = new BrowserWindow({
    width: 136,
    height: 136,
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false
    },
    fullscreenable: false,
    resizable: false,
    frame: false,
    alwaysOnTop: true,
    closable: false,
    show: false
  });
  splashWindow.loadURL(isDev ? 'http://localhost:3000/loading' : `file://${path.join(__dirname, '../build/loading.html')}`);
  Menu.setApplicationMenu(null)
  splashWindow.once('ready-to-show', () => {
    splashWindow.show();
    setTimeout(_ => {
      createMainWindow()
    }, 2000)
  })
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    minWidth: 900,
    minHeight: 680,
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false
    },
    fullscreenable: false,
    // resizable: false,
    show: false
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  // mainWindow.on('closed', () => mainWindow = null);
  mainWindow.on('closed', () => app.exit());

  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  } else {
    // disable menu toolbar
    const menuTemplate = [
      {
        label: 'Menu',
        submenu: [{
          label: 'Quit',
          accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
          click() { app.exit() },
        }],
      }
    ];
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(process.platform === 'darwin' ? mainMenu : null);
  }

  // show window only after it has been fully rendered
  mainWindow.once('ready-to-show', () => {
    // mainWindow.maximize();
    // mainWindow.setResizable(false);
    mainWindow.show();
    splashWindow.destroy();
  })

}

// app.on('ready', createMainWindow);
app.on('ready', createSplashWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.exit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

// User specific ipc stuff \\
require('./electron-ipc.js')
