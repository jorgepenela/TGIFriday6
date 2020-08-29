const express = require('express');
const http = require('http');
const MongoInterface = require('./lib/MongoInterface');

const app = express();

app.use(express.static('public'));
app.use('/static', express.static(__dirname + '/public'));
// body parser
app.use(express.json());

app.get('/usuario/:id', (request, response) => {
    console.log(request.params.id);
    MongoInterface.query('tgi5', 'amigos', {id:request.params.id}, (err, resultado)=>{
        response.writeHead(200, {
            'Content-Type': 'application/json'
        })
        .end(resultado);
    })
})

app.get('/usuario', (request, response) => {
    
});

app.post('/usuario', (request, response) => {
    console.log(request.body);
    MongoInterface.insert('tgi5', 'amigos', request.body, (err) => {
        if (err) {
            response.writeHead(500, {
                'Content-Type': 'application/json'
            })
            .end(JSON.stringify({resultado: 'error insercion'}))    
            return;
        }
        response.writeHead(200, {
            'Content-Type': 'application/json'
        })
        .end(JSON.stringify({resultado: 'usuario insertado'}))    
    })
})

app.put('/usuario', (request, response) => {

});

app.delete('/usuario', (request, response) => {
    
});

app.listen(3000, function () {
    console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});