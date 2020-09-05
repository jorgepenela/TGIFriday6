let zz = 0;
function retornaPromesa() {
    return new Promise((resolve, reject) => {
        console.log('init....');
        zz++;
        setTimeout(function() {
            console.log('fin....');
            if (zz===2) {
                reject('SE PUDRIO TODO');
                return;
            }
            resolve('resuelto con exito !!!!');
        }, 2000);    
    });
}

function comun(resolve) {
    console.log('init....');
    setTimeout(function() {
        console.log('fin....');
        resolve('resuelto con exito !!!!');
    }, 2000);
}

/*
retornaPromesa()
.then(z=>{ console.log(z); })
.catch(z=>{ console.log(z); })
.finally(()=>{ console.log('finally'); })
*/

(async function(cb) {
    for (let x = 0; x < 6; x++) {
        try {
            let x = await retornaPromesa();
            console.log(x);
        }
        catch (err) {
            console.log(err);
        }
    }
    cb();
}(ahoraSiQueTermino));

function ahoraSiQueTermino() {
    console.log('ahoraSiQueTermino');
}