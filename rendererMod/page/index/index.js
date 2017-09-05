const { ipcRenderer, remote } = require('electron');
const dev = require('../dev/dev');

dev(remote);


var ipc = ipcRenderer;
const _win = remote.getCurrentWindow(); //获取窗口实例
addEvent('click', $$('_closeBtn'), function(e) {
    // 向主线程发送同步消息
    // 主线程用  event.returnValue = 'pong' 返回消息
    // 会造成阻塞
    // console.log(new Date().getTime())
    // console.log(ipcRenderer.sendSync('synchronous-message', 'ping'));
    // console.log(new Date().getTime())
    // 
    // ==================
    // 发送异步消息
    // console.log(new Date().getTime())
    // ipcRenderer.send('asynchronous-message', 'ping')
    // console.log(new Date().getTime())
    // // 接收返回异步消息
    // ipcRenderer.on('asynchronous-reply',function (event,message) {
    // 	console.log(event)
    // 	console.log(message)
    // 	console.log(new Date().getTime())
    // })
    ipc.send('close_win');
})


addEvent('click', $$('_hideBtn'), function() {
    _win.minimize();
})

console.log(window.$('#_hideBtn'))




function addEvent(type, dom, fn) {
    if (dom) {
        dom.addEventListener(type, fn, false)
    }
}


/**
 * 获取dom元素
 * @param  string id 
 * @return dom  
 */
function $$(id) {
    var dom = document.getElementById(id);
    return dom;
}