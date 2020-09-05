const fs = require('fs');
const mongoInterface = require('./lib/MongoInterface');
const forEachAsync = require('./lib/forEachAsync');

function leerCarpetaPromise() {
    return new Promise((resolve, reject)=>{
        let carpetaFakes = '/var/archivosfake';
        fs.readdir(carpetaFakes, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(files);
        });                
    });    
}

function leearArchivoPromise(archivo) {
    return new Promise((resolve, reject)=>{
        let todoElPath = ['/var/archivosfake/', archivo].join('');
        fs.readFile(todoElPath, 'utf-8', function(err, obj) {
            if (err) {
                reject(err);
                return;
            }
            resolve(obj);
        });
    });
}

function insertarMongoPromise(obj) {
    return new Promise((resolve, reject)=>{
        let jsonParseado = null;
        try {
            jsonParseado = JSON.parse(obj);
        }
        catch (err) {
            reject('NO PUDE PARSEAR EL JSON');
            return;
        }
        mongoInterface.insert('tgi5', 'amigos', jsonParseado, 
                (err, resultado)=>{
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve('OK');
                });
    });
}


(async function() {
    let archivos = await leerCarpetaPromise();
    for (let unArchivo of archivos) {
        console.log(unArchivo);
        try {
            let contenido = await leearArchivoPromise(unArchivo);
            console.log(contenido);
            let resultado = await insertarMongoPromise(contenido);
            console.log(resultado);
        }
        catch (error) {
            console.log(error);
        }
    }
    console.log('FIN DEL PROCESO');
}());
