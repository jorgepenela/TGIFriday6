const GeneradorObjetosFalsos = require('./lib/GeneradorObjetosFalsos')
const fs = require('fs');

const ObjetoFalso = require('./lib/ObjetoFalso')

new GeneradorObjetosFalsos(100)
.setEvtObjetoFalsoGenerado((numero, objFake, next, abortar) => {
    console.log(`numero de fake: ${numero}`);
    console.log(objFake)
    let path = `/var/archivosfake/${objFake.id}.json`;
    fs.writeFile(path, JSON.stringify(objFake), 'utf-8', (err) => {
        if (err) {
            return abortar()
        }
        next()
    })
})
.setEvtOnRecorridaFinalizada(()=>{
    console.log('FINALIZO EL PROCESO');
})
.arrancar()