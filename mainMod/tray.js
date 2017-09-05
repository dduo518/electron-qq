const { app, BrowserWindow, ipcMain, Menu, Tray, nativeImage } = require('electron');
const path = require('path');
const url = require('url');
const createWindow = require('./createWin');


var _win = null;
module.exports = function(win) {
    const iconName = 'logo.png';
    const iconPath = path.join(__dirname, iconName);
    const appTray = new Tray(iconPath);
    appTray.setToolTip('QQ');
    appTray.on('click', function() {
        win.isMinimized() ? win.restore() : win.focus();
    })
    appTray.on('right-click', function(ev, bounds) {
        if (!_win) {
            var windPath =  path.join( __dirname, './../rendererMod/page/tray/tray.html')
            _win = createWindow(windPath, {
                width: 150,
                height: 297,
                frame: false,
                x: bounds.x,
                y: bounds.y - 297,
                skipTaskbar: true,
                alwaysOnTop: true,
                hasShadow: false,
                transparent: true,
                resizable: false
            });
            _win.focus();

            // _win.setSkipTaskbar(true)
        } else {
            _win.show();
        }
        _win.on('blur', function() {
            console.log('blur')
            _win.hide();
            console.log('关闭任务栏窗口')
                // _win = null;
        });
    });
    return _win;
}