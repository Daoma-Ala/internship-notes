// Traer un modulo en node

const fs = require('fs');
// Todos los metodos tienen un proceso asincrono

function leer(ruta, cb){
	fs.readFile(ruta, (err, data) => {
		cb(data.toString());
	});
}

function escribir (ruta, contenido, cb){
	fs.writeFile(ruta, contenido, function(err) {
		if (err){
			console.error('No he podido escribirlo ', err);
		}else {
			console.log('Se ha escrito correctamente');
		}
	});
}

//leer(__dirname + '/archivo.txt',console.log);
escribir(__dirname + '/archivo1.txt', 'Soy un archivo nuevo desde js', console.log);
