process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const soap = require('easy-soap-request');
const geosalud = require('./Geosalud');

// URL's
const urlGEOSaludPreProduccion = 'https://geosaludpreproduccion:8080/geosaludpreprod/servlet/awsgeosaludexpone?wsdl';
const urlGEOSaludProduccion = 'http://geosalud.alexanderfleming.org/servlet/awsgeosaludexpone?wsdl';
const urlMKE = 'http://srvms-mke:8082/Ventas.svc';
const urlMK = 'http://srvms-mk:8082/Ventas.svc';

// Config para WCF InformarConsumoPrestacion
const BasicHttpBinding = require('wcf.js').BasicHttpBinding;
const Proxy = require('wcf.js').Proxy;
const binding = new BasicHttpBinding();
const proxy = new Proxy(binding, urlMKE);

function armarXmlInformarPago(pacienteId, tipoDeOrden, ordenId) {
    return `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:con="Consolidado">
        <soapenv:Header/>
            <soapenv:Body>
                <con:wsGeoSaludExpone.Execute>
                    <con:Tipows>InformarPagoPaciente</con:Tipows>
                    <con:Xmlin>
                        &lt;sdtInformarPagoPacienteIAF xmlns="Consolidado"&gt;
                        &lt;IdPaciente&gt;${pacienteId}&lt;/IdPaciente&gt;
                        &lt;TipoOrdenOriginal&gt;${tipoDeOrden}&lt;/TipoOrdenOriginal&gt;
                        &lt;NumeroOrdenOriginal&gt;${ordenId}&lt;/NumeroOrdenOriginal&gt;
                        &lt;CancelaDeuda&gt;1&lt;/CancelaDeuda&gt;
                        &lt;/sdtInformarPagoPacienteIAF&gt;
                    </con:Xmlin>
                </con:wsGeoSaludExpone.Execute>
            </soapenv:Body>
        </soapenv:Envelope>
    `;
}

async function consumirSoapInformarPago(req, res) {
    const xml = armarXmlInformarPago(req.body.data.pacienteId, req.body.data.tipoDeOrden, req.body.data.ordenId);
    const { response } = await soap(urlGEOSaludPreProduccion, {'Content-Type': 'text/xml;charset=UTF-8'}, xml, 1000); // Optional timeout parameter(milliseconds)
    const { body } = response;
    res.send(body);
}

const consumirSoapInformarConsumo = (consumoPrestacion) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var xmlProcedimientos;
            var xml;
            geosalud.obtenerProcedimientos(consumoPrestacion.TipoOrdenOriginal, consumoPrestacion.NumeroOrdenOriginal)
            .then((data) => {
                var procedimientos = data;
                xmlProcedimientos = procedimientos.map(objeto => {
                    if(typeof(xmlProcedimientos) !== 'undefined') {
                        return `${xmlProcedimientos}
                        <apim:ConsumoPrestacionProcedimiento>
                        <apim:Acreditado>${objeto.Acreditado}</apim:Acreditado>
                        <apim:Cantidad>${objeto.Cantidad}</apim:Cantidad>
                        <apim:Codigo>${objeto.Codigo}</apim:Codigo>
                        <apim:CodigoAutorizacion>${objeto.CodigoAutorizacion}</apim:CodigoAutorizacion>
                        <apim:CodigoEstadoTransaccion>${objeto.CodigoEstadoTransaccion}</apim:CodigoEstadoTransaccion>
                        <apim:CodigoTransaccion/>
                        <apim:CuitProfesionalResponsable>${objeto.CuitProfesionalResponsable}</apim:CuitProfesionalResponsable>
                        <apim:DescripcionEquipoEfector/>
                        <apim:DescripcionEstadoTransaccion/>
                        <apim:DescripcionMensaje/>
                        <apim:Fecha>${objeto.Fecha}</apim:Fecha>
                        <apim:FechaGestion>${objeto.FechaGestion}</apim:FechaGestion>
                        <apim:HabilitaAjusteCargos>${objeto.HabilitaAjusteCargos}</apim:HabilitaAjusteCargos>
                        <apim:IdEspecialidadResponsable>${objeto.IdEspecialidadResponsable}</apim:IdEspecialidadResponsable>
                        <apim:IdSubEspecialidadResponsable/>
                        <apim:MontoIVAFinan>0.00</apim:MontoIVAFinan>
                        <apim:MontoIVAPaciente>0.00</apim:MontoIVAPaciente>
                        <apim:MontoNetoFinan>0.00</apim:MontoNetoFinan>
                        <apim:MontoNetoPaciente>0.00</apim:MontoNetoPaciente>
                        <apim:MontoTarifa>0.00</apim:MontoTarifa>
                        <apim:MontoTotalFinan>0.00</apim:MontoTotalFinan>
                        <apim:MontoTotalPaciente>0.00</apim:MontoTotalPaciente>
                        <apim:Observaciones>0.00</apim:Observaciones>
                        <apim:PorcentajeCobertura>0.00</apim:PorcentajeCobertura>
                        <apim:PorcentajePaciente>0.00</apim:PorcentajePaciente>
                        <apim:RequiereAutorizacion>${objeto.RequiereAutorizacion}</apim:RequiereAutorizacion>
                        <apim:Tipo>${objeto.Tipo}</apim:Tipo>
                        <apim:TipoMoneda/>
                        <apim:Vigencia>${objeto.Vigencia}</apim:Vigencia>
                        </apim:ConsumoPrestacionProcedimiento>
                        `;                
                    } else {
                        return `<apim:ConsumoPrestacionProcedimiento>
                                <apim:Acreditado>${objeto.Acreditado}</apim:Acreditado>
                                <apim:Cantidad>${objeto.Cantidad}</apim:Cantidad>
                                <apim:Codigo>${objeto.Codigo}</apim:Codigo>
                                <apim:CodigoAutorizacion>${objeto.CodigoAutorizacion}</apim:CodigoAutorizacion>
                                <apim:CodigoEstadoTransaccion>${objeto.CodigoEstadoTransaccion}</apim:CodigoEstadoTransaccion>
                                <apim:CodigoTransaccion/>
                                <apim:CuitProfesionalResponsable>${objeto.CuitProfesionalResponsable}</apim:CuitProfesionalResponsable>
                                <apim:DescripcionEquipoEfector/>
                                <apim:DescripcionEstadoTransaccion/>
                                <apim:DescripcionMensaje/>
                                <apim:Fecha>${objeto.Fecha}</apim:Fecha>
                                <apim:FechaGestion>${objeto.FechaGestion}</apim:FechaGestion>
                                <apim:HabilitaAjusteCargos>${objeto.HabilitaAjusteCargos}</apim:HabilitaAjusteCargos>
                                <apim:IdEspecialidadResponsable>${objeto.IdEspecialidadResponsable}</apim:IdEspecialidadResponsable>
                                <apim:IdSubEspecialidadResponsable/>
                                <apim:MontoIVAFinan>0.00</apim:MontoIVAFinan>
                                <apim:MontoIVAPaciente>0.00</apim:MontoIVAPaciente>
                                <apim:MontoNetoFinan>0.00</apim:MontoNetoFinan>
                                <apim:MontoNetoPaciente>0.00</apim:MontoNetoPaciente>
                                <apim:MontoTarifa>0.00</apim:MontoTarifa>
                                <apim:MontoTotalFinan>0.00</apim:MontoTotalFinan>
                                <apim:MontoTotalPaciente>0.00</apim:MontoTotalPaciente>
                                <apim:Observaciones>0.00</apim:Observaciones>
                                <apim:PorcentajeCobertura>0.00</apim:PorcentajeCobertura>
                                <apim:PorcentajePaciente>0.00</apim:PorcentajePaciente>
                                <apim:RequiereAutorizacion>${objeto.RequiereAutorizacion}</apim:RequiereAutorizacion>
                                <apim:Tipo>${objeto.Tipo}</apim:Tipo>
                                <apim:TipoMoneda/>
                                <apim:Vigencia>${objeto.Vigencia}</apim:Vigencia>
                                </apim:ConsumoPrestacionProcedimiento>`;
                    }
                });
                xml = `
                    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/" xmlns:apim="http://schemas.datacontract.org/2004/07/APIMarkey">
                        <soapenv:Header/>
                        <soapenv:Body>
                        <tem:InformarConsumoPrestacion_000006ABM>
                            <tem:oConsumoPrestacion>
                                <apim:Ambito>${consumoPrestacion.Ambito}</apim:Ambito>
                                <apim:CoberturaID>${consumoPrestacion.CoberturaID}</apim:CoberturaID>
                                <apim:CodigoDiagnostico/>
                                <apim:CodigoOperacion>${consumoPrestacion.CodigoOperacion}</apim:CodigoOperacion>
                                <apim:CodigoSede>${consumoPrestacion.CodigoSede}</apim:CodigoSede>
                                <apim:CuitEmpresa>${consumoPrestacion.CuitEmpresa}</apim:CuitEmpresa>
                                <apim:CuitProfesionalSolicitante>${consumoPrestacion.CuitProfesionalSolicitante}</apim:CuitProfesionalSolicitante>
                                <apim:Diagnostico/>
                                <apim:FechaIndicacion>${consumoPrestacion.FechaIndicacion}</apim:FechaIndicacion>
                                <apim:IdEspecialidadSolicitante>${consumoPrestacion.IdEspecialidadSolicitante}</apim:IdEspecialidadSolicitante>
                                <apim:IdSubEspecialidadSolicitante/>
                                <apim:NumeroOrdenOriginal>${consumoPrestacion.NumeroOrdenOriginal}</apim:NumeroOrdenOriginal>
                                <apim:ObservacionesIndicacion/>
                                <apim:PacienteID>${consumoPrestacion.PacienteID}</apim:PacienteID>
                                <apim:PlanID>${consumoPrestacion.PlanId}</apim:PlanID>
                                <apim:Procedimientos>
                                ${xmlProcedimientos.join('')}
                                </apim:Procedimientos>      
                                <apim:TipoContratacion>${consumoPrestacion.TipoContratacion}</apim:TipoContratacion>
                                <apim:TipoOrdenOriginal>${consumoPrestacion.TipoOrdenOriginal}</apim:TipoOrdenOriginal>
                                <apim:Usuario/>
                            </tem:oConsumoPrestacion>
                        </tem:InformarConsumoPrestacion_000006ABM>
                        </soapenv:Body>
                    </soapenv:Envelope>
                    `;
                    console.log('XML: ', xml);
                    proxy.send(xml, "http://tempuri.org/IVentas/InformarConsumoPrestacion_000006ABM", (response) => {
                        resolve(response);
                    });
            }).catch((err) => {
                console.log('Error obtenerProcedimientos: ', err);
                reject('Error obtenerProcedimientos: ', err);
            });            
        }, 100);
    });
}


function informarConsumo(req, res) {
    const data = req.body.data;
    consumirSoapInformarConsumo(data).then(response => {
        console.log(response);
        res.send(response);
    }).catch(err => {
        console.log(err);
        res.status(404).send(err);
    });
}

module.exports = {
    consumirSoapInformarPago: consumirSoapInformarPago,
    informarConsumo: informarConsumo
};

