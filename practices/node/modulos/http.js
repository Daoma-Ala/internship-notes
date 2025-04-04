const http = require('http');

http.createServer(function (req, res){
	console.log('nueva peticion');
	console.log(req.url);

	res.writeHead(201, {'Content-Type': 'text/plain'});
	res.write('Hola desde el servidor');
	res.end();
}).listen(3000);

console.log('Escuchando http en el puerto 3000');
