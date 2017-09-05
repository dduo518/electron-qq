const { app, BrowserWindow, ipcMain, Menu, Tray, nativeImage } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');

const createTray = require('./mainMod/tray')
const createWindow = require('./mainMod/createWin')
const Cache = require('./mainMod/cache')();

const settings = require('./config');

const winURL = settings.dev ? `http://localhost:${settings.port}` : `file://${__dirname}/output/static/index.html`;

let win = {};

var iconPath = path.join(__dirname + '/logo.png')

var image = nativeImage.createFromPath(iconPath);

var tray = null;
// 任务启动
app.on('ready', function() {
    // var iconPath = path.join(__dirname + '/logo.png')
    // var image = nativeImage.createFromPath(iconPath);


    var options = {
            width: 460,
            height: 380,
            frame: false,
            // minHeight:280,
            // maxHeight:960,
            minWidth: 460,
            alwaysOnTop: true,
            // maxWidth:460
            // skipTaskbar:true
            // resizable: false,
            transparent: true,
            icon: image,
            dev:true
        };

    const winPath = path.join( __dirname, './rendererMod/page/login/login.html');
    var _win = new createWindow(winPath,options);
    
    tray = createTray(_win);

    // _win.setOverlayIcon(iconPath)
    // _win.setThumbarButtons([
    //     { icon: iconPath }
    // ])

    win['login'] = _win;
    // _win.webContents.openDevTools()
    _win.webContents.on('did-finish-load', function() {
        var account = Cache.readCache();
        account && _win.webContents.send('cache-user', account);
    });
});


// 监听窗口退出
app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win == null) {
        createWindow();
    }
})


// 接收登录验证
// 打开主窗口
var timer = null;
ipcMain.on('login', function(dender, message) {
    var user = message.user,
        pw = message.pw,
        autoLogin = message.autoLogin,
        rememoberPW = message.rememoberPW;
    var data = user + '|' + pw + '|' + autoLogin + '|' + rememoberPW;
    Cache.writeCache(data);
    timer = setTimeout(function() {
        var _win = createWindow(winURL, {
            width: 280,
            height: 880,
            frame: true,
            minHeight: 280,
            minWidth: 280,
            maxHeight: 960,
            // maxWidth: 460,
            alwaysOnTop: false,
            x: 1500,
            y: 150,
            // skipTaskbar:true
            resizable: true,
            transparent: false,
            icon: image,
            dev: true
        });
        _win.webContents.openDevTools()
        win['login'].hide();
        win['index'] = _win;
    }, 3000);
});
ipcMain.on('close_win', function() {
    console.log('close_win')
    app.quit();
});
ipcMain.on('cancel', function(event, msg) {
    console.log('cancel-login')
    console.log(msg)
    clearTimeout(timer)
})




