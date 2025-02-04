// Construir una promesa 
// Algo que va a pasar

// Estados -Pendiente -Cumplido -Rechazado

const promise = new Promise(function(resolve, reject){
    resolve('Hey, todo ha sido correcto')
});

// 
const cows = 12;

const countCows = new Promise(function(resolve, reject){
    if(cows>10){
        resolve(`We have ${cows} on the farm`);
    }else{
        reject('There is no cows on the farm');
    }
});

countCows.then((result) =>  {
    console.log(result);
}).catch((error)=>{
    console.error(error);
}).finally(() => {
    console.log('Finally');
});

