let mapaEventos = {};

const EVENTO_X_TIEMPO = 'EVENTO_X_TIEMPO';

function suscribe(idStr, fn) {
    mapaEventos[idStr] = fn;
}

function hacera() {
    (function inner() {
        if (mapaEventos[EVENTO_X_TIEMPO]) {
            mapaEventos[EVENTO_X_TIEMPO].apply();
        }
        setTimeout(inner, 2000);
    }());
}

function hacerb() {

}

module.exports = {
    EVENTO_X_TIEMPO,
    suscribe,
    funciones : {
        hacera,
        hacerb
    }
}