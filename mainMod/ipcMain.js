const { ipcMain, session } = require('electron');



module.exports = function(win) {

    // 接收登录验证
    ipcMain.on('login', function(dender, message) {
        console.log('login')
        console.log(message);
        var user = message.user,
            pw = message.pw;
        session.defaultSession.cookies.set({ user: user, pw: pw });

    });

    session.defaultSession.cookies.get({}, function(err, cookies) {
        console.log(cookies)
    });
}