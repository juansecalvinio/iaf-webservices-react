const express = require('express');
const bodyParser = require('body-parser');

const controladorSoap = require('./controllers/Soap');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello from Express' });
});

app.post('/api/informarPago', controladorSoap.consumirSoap);

const puerto = 3335;

app.listen(puerto, () => {
    console.log(`Escuchando en el puerto ${puerto}`);
})