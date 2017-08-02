module.exports.init = function(id) {
    const spawn = require('child_process').spawn;
    const pm2 = spawn('pm2', ['logs', id, '--lines', '1']);

    process.stdout.write('\033c');

    pm2.stdout.on('data', (data) => {
	process.stdout.moveCursor(0, -1);
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	process.stdout.write(data.toString());
    });
    
    pm2.on('close', (code) => {
	console.log(`child process exited with code ${code}`);
    });
}
