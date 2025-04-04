const { exec } = require('child_process');

exec ('ls -l', (err, stdout, sterr) => {
	if (err){
		console.error(err);
		return false;
	}

	console.log(stdout);
});
