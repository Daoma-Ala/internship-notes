console.log('Algo');
console.info('Algo');
console.error('Error de algo');
console.warn('Error 2 de algo');

var tabla = [
	{
		a: 1,
		b: 'z'
	},
	{
		a: 2,
		b: 'Otra letra'
	}

]
console.table(tabla);


console.group('Datos');
console.log('Nombre: Daniel Alameda');
console.log('Edad: 22');
console.groupEnd('Datos');

console.log('Otra cosa');
