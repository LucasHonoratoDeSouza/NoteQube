const { createWindowMain, createSplashWindow } = require('./main')
const {app, globalShortcut} = require('electron')


app.on('ready', () => {
    createWindowMain();
    const ret = globalShortcut.register('CommandOrControl+Shift+I', () => {

    })
    if (!ret) {
        console.log('Falha ao registrar o atalho');
    }
    console.log(globalShortcut.isRegistered('CommandOrControl+Shift+I'));
});
  
app.on('will-quit', () => {
    globalShortcut.unregister('CommandOrControl+Shift+I');
});

app.allowRendererProcessReuse = false



