const electron = require('electron');
const {app, ipcMain} = electron;
// const ipcMain = electron.ipcMain;

const ipcMainCustom = () => {

    ipcMain.on('app:quit', (event, arg) => {
        app.exit();
        return;
    });

    ipcMain.on('get:demo', (event, arg) => {
        event.returnValue = {success: true, arguments: arg, response: 'This is a successful response of an ipcRenderer.send <-> ipcMain.on demonstration.'}
    });



}
module.exports = ipcMainCustom();
