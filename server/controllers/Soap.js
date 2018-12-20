process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const soap = require('easy-soap-request');
//const fs = require('fs');

const urlPreProduccion = 'https://geosaludpreproduccion:8080/geosaludpreprod/servlet/awsgeosaludexpone?wsdl';

const urlProduccion = 'http://geosalud.alexanderfleming.org/servlet/awsgeosaludexpone?wsdl';

const headers = {
    'Content-Type': 'text/xml;charset=UTF-8',
};

function armarXml(pacienteId, tipoOrden, nroOrden) {
    return `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:con="Consolidado">
        <soapenv:Header/>
        <soapenv:Body>
        <con:wsGeoSaludExpone.Execute>
            <con:Tipows>InformarPagoPaciente</con:Tipows>
            <con:Xmlin>
            &lt;sdtInformarPagoPacienteIAF xmlns="Consolidado"&gt;
            &lt;IdPaciente&gt;${pacienteId}&lt;/IdPaciente&gt;
            &lt;TipoOrdenOriginal&gt;${tipoOrden}&lt;/TipoOrdenOriginal&gt;
            &lt;NumeroOrdenOriginal&gt;${nroOrden}&lt;/NumeroOrdenOriginal&gt;
            &lt;CancelaDeuda&gt;1&lt;/CancelaDeuda&gt;
            &lt;/sdtInformarPagoPacienteIAF&gt;
            </con:Xmlin>
        </con:wsGeoSaludExpone.Execute>
        </soapenv:Body>
        </soapenv:Envelope>
    `;
}

async function consumirSoap(req, res) {
    const xml = armarXml(req.query.paciente, req.query.tipos, req.query.os);
    const { response } = await soap(urlPreProduccion, headers, xml, 1000); // Optional timeout parameter(milliseconds)
    const { body } = response;
    res.send(body);
}

module.exports = {
    consumirSoap: consumirSoap
};

