const listaDeComprar = {
	manzana: 5,
	pera: 3,
	naranja: 2,
	uva: 1
};

for (fruta in listaDeComprar){
	console.log(fruta);
}

for (fruta in listaDeComprar){
	console.log(`${fruta}: ${listaDeComprar[fruta]}`);
}
