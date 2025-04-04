const fs = require('fs');

let data = '';

let readableStream = fs.createReadStream(__dirname + '/input.txt');

readableStream.on('data', function(chunk){
	console.log(chunk.toString());
});
