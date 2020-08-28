const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

let objDeprecateCfg = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

class MongoInterface {
    insert(base, coleccion, documento, callBackFn) {
        MongoClient.connect(url, objDeprecateCfg, function(err, client) {
            if (err) {
                console.log(`se produjo un error ${err}`);
                return;
            }
            console.log("conectado");
           
            const db = client.db(base);
            const collection = db.collection(coleccion);
            
            collection.insert(documento, (err2, resultado) => {
                if (err2) {
                    console.log(`se produjo un error ${err2}`);
                    callBackFn(err2);
                    return;
                }
                console.log(resultado);
                client.close();
                callBackFn(undefined, resultado);
            });
          });
    }
    query(base, coleccion, query, callBackFn) {
        MongoClient.connect(url, objDeprecateCfg, function(err, client) {
            if (err) {
                console.log(`se produjo un error ${err}`);
                return;
            }
            console.log("conectado");
           
            const db = client.db(base);
            const collection = db.collection(coleccion);
           
            query = JSON.stringify(query);
            collection.find(query).toArray(function(err2, resultado) {
                if (err2) {
                    console.log(`se produjo un error ${err2}`);
                    return;
                }
                console.log(resultado);
                client.close();
                callBackFn(undefined, resultado);
            });
          });
    }
}

module.exports = new MongoInterface();