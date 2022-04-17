// const cron = require('node-cron'),
// 	spawn = require('child_process').spawn;

// function cronBackup() {
// 	cron.schedule('* * * * *', () => {
//         console.log('loglog')
// 		const backupProcess = spawn('mongodump', [
// 			'--uri mongodb+srv://mern:JAUBBCvA4CMn1X82jQFS@mern-cluster.y22mw.mongodb.net/chiringuito',
// 			'--forceTableScan',
// 		]);

// 		backupProcess.on('exit', (code, signal) => {
// 			if (code) console.log('Backup process exited with code ', code);
// 			else if (signal)
// 				console.error('Backup process was killed with singal ', signal);
// 			else console.log('Successfully backedup the database');
// 		});
// 	});
// }

// module.exports = cronBackup;