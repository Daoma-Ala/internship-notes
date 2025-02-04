let expr = "Mangos";

switch(expr){
	case "Naranjas":
		console.log("Las Naranjas cuestan $20 el kilo");
		break;
	case "Manzanas":
		console.log("Las Manazanas cuestan $43 el kilo");
		break;
	case "Platanos":
		console.log("Los Platanos cuestan $30 el kilo");
		break;
	case "Mangos":
	case "Papayas":
		console.log("Los Mangos y las Papayas cuenstan $25 el kilo");
		break;
	default:
		console.log(`Lo sentimos no contamos con la fruta ${expr}`);
}


