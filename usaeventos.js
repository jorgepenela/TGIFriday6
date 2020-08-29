const eventos = require('./lib/eventos');

eventos.funciones.hacera();

setTimeout(function() {
    eventos.suscribe(eventos.EVENTO_X_TIEMPO, function() {
        console.log(new Date().getMilliseconds());
    });
}, 10000);
