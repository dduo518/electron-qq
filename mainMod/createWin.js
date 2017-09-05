const { app, BrowserWindow, ipcMain, Menu, Tray, nativeImage } = require('electron');
const path = require('path');
const url = require('url');


var win = {};
module.exports = function(_url, opts) {
    var _win = new BrowserWindow(opts);
    if (opts.dev) {
        _win.loadURL(url.format({
            pathname: _url, 
            protocol: 'file:',
            slashes: true
          }))
        
    } else {
        _win.loadURL(_url)
    }
    win[_win.id] = _win;
    // _win.webContents.openDevTools();
    _win.on('closed', () => {
        _win = null;
    })
    _win.on('close', () => {
        win[_win.id] = null;
    })
    return _win;
}