const express = require('express');
const bodyParser = require('body-parser');

const controladorSoap = require('./controllers/Soap');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello from Express' });
});

app.post('/api/informarPago', controladorSoap.consumirSoap);

const puerto = 5000;

app.listen(puerto, () => {
    console.log(`Escuchando en el puerto ${puerto}`);
})