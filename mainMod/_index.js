



const {ipcRenderer} = require('electron');
console.log(ipcRenderer);
var ipc = ipcRenderer;
var btn = $('btn');
onEvent(btn,'click',function(e){
    ipc.send('create_browser',{type:'888'})
})





function $(str){
    var dom = document.getElementById(str);
    return dom;
}

// 事件bangding
function onEvent(dom,event,fn){
    dom.addEventListener(event,function(e){
        fn(e)
    })
}
