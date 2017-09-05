const { remote, ipcRenderer } = require('electron');
var path = require('path')
const dev = require('../dev/dev');
dev(remote);


const _win = remote.getCurrentWindow(); //获取窗口实例
const ipc = ipcRenderer;
ipc.on('cache-user', function(event, msg) {
    if (msg.rememoberPW) {
        $('input[name=password]').val(msg.pw);
    }
    $('input[name=username]').val(msg.user);
    $('input[name=rememberPW]')[0].checked = msg.rememoberPW;
    $('input[name=autoLogin]')[0].checked = msg.autoLogin;
    if (msg.autoLogin) {
        // $('#loginByn')[0].click();
    }
});



$('#_hideBtn').on('click', function() {
    _win.minimize();
})
$('#_closeBtn').on('click', function() {
    _win.hide();
    ipc.send('close_win');
})


$('#loginByn').on('click', function() {
    var type = $(this).attr('data-type');
    var user = $('.login-form').find('input[name="username"]').val();
    var pw = $('.login-form').find('input[name="password"]').val();
    var rememoberPW = $('.login-form').find('input[name="rememberPW"]')[0].checked;
    var autoLogin = $('.login-form').find('input[type="checkbox"]')[0].checked;
    if (type == 'login') {
        loading($(this));
        ipc.send('login', { user: user, pw: pw, rememoberPW: rememoberPW, autoLogin: autoLogin });
    } else {
        cancel($(this))
    }
});

$('#cancelBtn').on('click', function(e) {
    ipc.send('cancel', {});
    cancel(dom)
});




function loading(dom) {
    $(dom).attr('data-type', 'cancel')
    $('.content img').addClass('loading');
    $('.login-form:not(.form_login_btn)').addClass('visibiehide');
    $('.form_login_btn').find('button').text('取消');
}

function cancel(dom) {
    $(dom).attr('data-type', 'login')
    $('.content img').removeClass('loading');
    $('.login-form:not(.form_login_btn)').removeClass('visibiehide');
    $('.form_login_btn').find('button').text('登录');
}