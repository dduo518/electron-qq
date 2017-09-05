// const {remote} = require('./../login/login.js');
// 

// remote.getCurrentWindow() 获取当前窗口对象
module.exports = function (remote) {
	$('#dev').on('click',function () {
		remote.getCurrentWindow().webContents.openDevTools();
		// console.log(remote)
	});
	$('#reload').on('click',function () {
		remote.getCurrentWindow().reload();
	})
}