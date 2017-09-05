const path = require('path');
const url = require('url');
const fs = require('fs');


// 读写本地缓存

module.exports = function() {

    function readCache() {
        var url = path.resolve(__dirname + '/../cache/cache.txt');
        var cache = null;
        try {
            cache = fs.readFileSync(url, 'utf-8');
        } catch (e) {
            console.info(e);
        }
        var account = null;
        if (cache) {
            var userList = cache.split('|');
            account = {
                user: userList[0],
                pw: userList[1],
                autoLogin: userList[2],
                rememoberPW: userList[3]
            }
        }
        return account;
    }

    function writeCache(data) {
        var url = path.resolve(__dirname + '/../cache');
        fs.access(url, (err) => {
            if (err) {
                fs.mkdir(url, function(err) {
                    fs.writeFileSync(url + '/cache.txt', data);
                });
            } else {
                fs.writeFileSync(url + '/cache.txt', data);
            }
        });
    }
    return {
        writeCache: writeCache,
        readCache: readCache
    }
}