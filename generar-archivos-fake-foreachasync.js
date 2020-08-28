const ObjetoFalso = require('./lib/ObjetoFalso')
const forEachAsync = require('./lib/forEachAsync')
const fs = require('fs');

/*
Genero un array de objetos falsos
*/

let arrObjFalsos = []

for (let x = 0; x < 10; x++) {
    arrObjFalsos.push(new ObjetoFalso())
}

forEachAsync(arrObjFalsos, (objFake, next, abort) => {
    console.log(objFake)
    let path = `/var/archivosfake/${objFake.id}.json`;
    fs.writeFile(path, JSON.stringify(objFake), 'utf-8', (err) => {
        if (err) {
            return abort()
        }
        next()
    })
}, ()=>{
    console.log('fin del proceso');
    setTimeout(segunda, 5000);
})

function segunda() {
    forEachAsync(arrObjFalsos, (objFake, next, abort) => {
        console.log(objFake)
        setTimeout(next, 2000);
    })
}
