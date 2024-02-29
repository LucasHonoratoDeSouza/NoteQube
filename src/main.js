const { BrowserWindow } = require('electron');


let mainWindow;

function createWindowMain(){
    mainWindow = new BrowserWindow({
        width: 1700,
        height: 900,
        movable: true,
        title: 'NoteQuill',
        icon: __dirname + '/ui/imgs/icon.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }        
    });
    //mainWindow.setMenuBarVisibility(false)
    mainWindow.loadURL(`file://${__dirname}/index.html`)
};
  


module.exports = { createWindowMain }

