const accountSid = 'ACa37ace4bdcf3d6bea9e08888e980b5ff';
const authToken = 'e948900efa6308d8d46f2ab8a202f7df';
const client = require('twilio')(accountSid, authToken);

client.messages
	.create({
		body: 'Hola mi nombre es Daniel Omar',
		from: '+12769001602',
		to: '+526442121807'
	})
	.then(message => console.log(message.sid));
