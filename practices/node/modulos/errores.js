function otraFuncion(){
	return serompe();
}

function serompe(){
	return 3 + z;
}

try{
	otraFuncion();
}catch(error){
	console.error('Algo salio mal');
	console.error(error.message);
}
