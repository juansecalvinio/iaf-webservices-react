const express = require('express');
const bodyParser = require('body-parser');
const controladorGeoSalud = require('./controllers/Geosalud');
const controladorSoap = require('./controllers/Soap');
const path = require('path');

// Settings
const app = express();
const puerto = 8000;

// Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Produccion
if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(`${__dirname}/../../build`));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}

// GET
app.get('/api/hello', (req, res) => { res.send({ express: 'Hello from Express' }); });
app.get('/api/obtenerConsumos', controladorGeoSalud.obtenerConsumos);
app.get('/api/obtenerProcedimientos', controladorGeoSalud.obtenerProcedimientos);

// POST
app.post('/api/informarPago', controladorSoap.consumirSoapInformarPago);
app.post('/api/informarConsumo', controladorSoap.informarConsumo);

app.listen(puerto, () => {
    console.log(`Escuchando en el puerto ${puerto}`);
})