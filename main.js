const { app, BrowserWindow, globalShortcut  } = require('electron')
const config = require('./config')

let win;

function createWindow () {
    // create the browser window.
    win = new BrowserWindow({
        width:800,
        height: 600,
        titleBarStyle: 'hidden',
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.hmtl of the app.
    win.loadURL(config.url)
}

function toggleDevTools() {
    win.webContents.toggleDevTools()
}

function createShortcuts() {
    globalShortcut.register('CmdOrCtrl+J', toggleDevTools)
}

    // this method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // some APIs can only be used after this event occurs.
    app.whenReady()
        .then(createWindow)
        .then(createShortcuts)

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
        // On macOS it is common for applications and their menu bars 
        // to stay active until the user quits explicity with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the 
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })

    // In thiw file you can include the rest of your app's specific me
    // code. You can also put them in separete files and require them here.
