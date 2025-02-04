function sum(num1, num2){
    return num1 + num2;
}

function calc(num1, num2, callback){
    return callback(num1, num2);
}

// No es necesario poner los parentisis de la funciíon porque si no la
// estuvieramos invocando
console.log(calc(2, 2, sum));

setTimeout(() => {
    console.log("Hola javascript");
}, 2000);


function grettin(name){
    console.log("Hola :"+name);
}
setTimeout(grettin, 2000, 'Daniel');