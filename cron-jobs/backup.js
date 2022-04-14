const cron = require('node-cron'),
	spawn = require('child_process').spawn;

function cronBackup() {
	cron.schedule('* * * * *', () => {
        console.log('loglog')
		spawn = require('child_process').spawn;
		const backupProcess = spawn('mongodump', [
			'--db=chiringuito',
			'--archive=./backups',
			'--gzip',
		]);

		backupProcess.on('exit', (code, signal) => {
			if (code) console.log('Backup process exited with code ', code);
			else if (signal)
				console.error('Backup process was killed with singal ', signal);
			else console.log('Successfully backedup the database');
		});
	});
}

module.exports = cronBackup;
