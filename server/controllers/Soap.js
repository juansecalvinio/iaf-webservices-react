process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const soap = require('easy-soap-request');
const geosalud = require('./Geosalud');

const urlGEOSaludPreProduccion = 'https://geosaludpreproduccion:8080/geosaludpreprod/servlet/awsgeosaludexpone?wsdl';

const urlGEOSaludProduccion = 'http://geosalud.alexanderfleming.org/servlet/awsgeosaludexpone?wsdl';

const urlMKE = 'http://srvms-mke:8082/Ventas.svc?wsdl';

const urlMK = 'http://srvms-mke:8082/Ventas.svc?wsdl';

const headers = {
    'Content-Type': 'text/xml;charset=UTF-8',
};

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
    const { response } = await soap(urlGEOSaludPreProduccion, headers, xml, 1000); // Optional timeout parameter(milliseconds)
    const { body } = response;
    res.send(body);
}


function armarXmlInformarConsumo(consumoPrestacion) {
    geosalud.obtenerProcedimientos(consumoPrestacion.TipoOrdenOriginal, consumoPrestacion.NumeroOrdenOriginal)
    .then((data) => {
        var procedimientos = data;
        var xmlProcedimientos = procedimientos.map((objeto) => {
            if(typeof(xmlProcedimientos) !== 'undefined') {
                return `${xmlProcedimientos}
                <apim:Procedimientos>
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
                </apim:Procedimientos>
                `;                
            } else {
                return `<apim:Procedimientos>
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
                        </apim:Procedimientos>`;
            }
        });
        var xml = `
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
                    ${xmlProcedimientos.join('')}           
                    <apim:TipoContratacion>${consumoPrestacion.TipoContratacion}</apim:TipoContratacion>
                    <apim:TipoOrdenOriginal>${consumoPrestacion.TipoOrdenOriginal}</apim:TipoOrdenOriginal>
                    <apim:Usuario/>
                </tem:oConsumoPrestacion>
            </tem:InformarConsumoPrestacion_000006ABM>
            </soapenv:Body>
        </soapenv:Envelope>
        `;
        return xml;
    }).catch((err) => {
        console.log(err);
    });
}

async function consumirSoapInformarConsumo(req, res) {
    const orden = req.body.data;
    const xml = armarXmlInformarConsumo(orden);
    const { response } = await soap(urlMKE, headers, xml, 1000); // Optional timeout parameter(milliseconds)
    const { body } = response;
    res.send(body);
}

module.exports = {
    consumirSoapInformarPago: consumirSoapInformarPago,
    consumirSoapInformarConsumo: consumirSoapInformarConsumo
};

