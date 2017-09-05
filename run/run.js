var child_exce = require('child_process').exec;
const treeKill = require('tree-kill');

let YELLOW = '\x1b[33m';
let BLUE = '\x1b[34m';
let END = '\x1b[0m';

var children = [];
let isElectronOpen = false;

function run(command) {
    console.log(command)
    var child = child_exce(command);
    // console.log(child)
    child.stdout.on('data', (data) => {
        console.log(data)
        if (/Compiled/g.test(data.toString().trim().replace(/\n/g, '\n')) && !isElectronOpen) {
            run('npm run electron');
            isElectronOpen = true;
        }
    });
    child.on('exit', (code) => exit(code));
    children.push(child);
}

function exit(code) {
    children.forEach(child => {
        treeKill(child.pid);
    });
}
console.log(`${YELLOW}Starting webpack-dev-server...\n${END}`)
run(`webpack `);