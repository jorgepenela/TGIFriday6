const fs = require('fs');
const mongoInterface = require('./lib/MongoInterface');
const forEachAsync = require('./lib/forEachAsync');

let carpetaFakes = '/var/archivosfake';
fs.readdir(carpetaFakes, (err, files) => {
    forEachAsync(files, (unFile, next, abort)=>{
        console.log(unFile);
        let todoElPath = ['/var/archivosfake/', unFile].join('');
        fs.readFile(todoElPath, 'utf-8', function(err, obj) {
            if (err) {
                console.log(err);
                abort();
                return;
            }
            mongoInterface.insert('tgi5', 'amigos', JSON.parse(obj), 
                (err2, resultado)=>{
                    console.log(err2);
                    console.log(resultado);
                    console.log(obj);
                    setTimeout(next, 2000);
                })
        })
    }, ()=>{
        console.log('trabajo terminado');
    }); 
});


