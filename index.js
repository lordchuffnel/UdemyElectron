const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

let mainWindow;

const { app, BrowserWindow, ipcMain } = electron;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('videoLength', (event, path) => {
    ffmpeg.ffprobe(path, (err, metadata) => {
        mainWindow.webContents.send('videoMeta', metadata.format.duration);
    });
});