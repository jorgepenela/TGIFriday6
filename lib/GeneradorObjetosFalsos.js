const uuid = require('uuid')
const ObjetoFalso = require('./ObjetoFalso')
const _ = require('underscore');

class GeneradorObjetosFalsos {
    constructor(cant) {  
        this.cantidad = cant
        this.idx = 0
        this.abortado = null

        this.eventos= {
          onObjetoFalsoGenerado: () => {}, 
          onRecorridaFinalizada: () => {},
        }
    }
  
    get_cantidad() {
      return this.cantidad
    }

    inc_idx() {
        this.idx++
    }
  
    setEvtObjetoFalsoGenerado(fn) {
        this.eventos.onObjetoFalsoGenerado = fn
        return this
    }
    
    setEvtOnRecorridaFinalizada(fn) {
        this.eventos.onRecorridaFinalizada = fn
        return this
    }
    
    generarObjetosFalsos()  {    
        if ((this.idx == this.cantidad) || (this.abortado)) {
            if (this.abortado) {
                console.log('proceo abortado por error al escribir')
                return
            } 
            this.eventos.onRecorridaFinalizada()
            return
        }
        this.inc_idx()
        
        const objGenerado = new ObjetoFalso()
        _.defer(()=>{
            this.eventos.onObjetoFalsoGenerado(this.idx, objGenerado, () => this.continuar(), () => this.abortar)
        })
    }

    continuar() {
        this.generarObjetosFalsos()
    }

    abortar()  {
        this.abortado = true
        this.continuar()
    }

    arrancar() {
        console.log('------arrancando---------------')
        this.continuar()
    } 
}

module.exports = GeneradorObjetosFalsos