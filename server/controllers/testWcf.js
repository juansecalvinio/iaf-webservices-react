const BasicHttpBinding = require('wcf.js').BasicHttpBinding;
const Proxy = require('wcf.js').Proxy;
const binding = new BasicHttpBinding();
const proxy = new Proxy(binding, "http://srvms-mke:8082/Ventas.svc");

const message = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/" xmlns:apim="http://schemas.datacontract.org/2004/07/APIMarkey">
<soapenv:Header/>
<soapenv:Body>
   <tem:InformarConsumoPrestacion_000006ABM>
      <tem:oConsumoPrestacion>
         <apim:Ambito>1</apim:Ambito>
         <apim:CoberturaID>5407</apim:CoberturaID>
       <apim:CodigoDiagnostico/>
         <apim:CodigoOperacion>LIQUIDACION;2019-01-04 15:15:44</apim:CodigoOperacion>
         <apim:CodigoSede>1</apim:CodigoSede>
         <apim:CuitEmpresa> </apim:CuitEmpresa>
         <apim:CuitProfesionalSolicitante>27308489197</apim:CuitProfesionalSolicitante>
         <apim:Diagnostico/>
         <apim:FechaIndicacion>2018-10-04T04:00:00</apim:FechaIndicacion>
         <apim:IdEspecialidadSolicitante>145</apim:IdEspecialidadSolicitante>
         <apim:IdSubEspecialidadSolicitante/>
         <apim:NumeroOrdenOriginal>116041</apim:NumeroOrdenOriginal>
         <apim:ObservacionesIndicacion/>
         <apim:PacienteID>13023</apim:PacienteID>
         <apim:PlanID>1</apim:PlanID>
         <apim:Procedimientos>
            <apim:ConsumoPrestacionProcedimiento>
               <apim:Acreditado>1</apim:Acreditado>
               <apim:Cantidad>1</apim:Cantidad>
               <apim:Codigo>420101034</apim:Codigo>
               <apim:CodigoAutorizacion>1</apim:CodigoAutorizacion>
               <apim:CodigoEstadoTransaccion>false</apim:CodigoEstadoTransaccion>
               <apim:CodigoTransaccion/>
               <apim:CuitProfesionalResponsable>27308489197</apim:CuitProfesionalResponsable>
               <apim:DescripcionEquipoEfector/>
               <apim:DescripcionEstadoTransaccion/>
               <apim:DescripcionMensaje/>
               <apim:Fecha>2018-10-04T04:00:00</apim:Fecha>
               <apim:FechaGestion>2018-10-04T04:00:00</apim:FechaGestion>
               <apim:HabilitaAjusteCargos>0</apim:HabilitaAjusteCargos>
               <apim:IdEspecialidadResponsable>145</apim:IdEspecialidadResponsable>
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
               <apim:RequiereAutorizacion>false</apim:RequiereAutorizacion>
               <apim:Tipo>P</apim:Tipo>
               <apim:TipoMoneda/>
               <apim:Vigencia>true</apim:Vigencia>
            </apim:ConsumoPrestacionProcedimiento>
         </apim:Procedimientos>
         <apim:TipoContratacion>2</apim:TipoContratacion>
         <apim:TipoOrdenOriginal>1002</apim:TipoOrdenOriginal>
         <apim:Usuario/>
      </tem:oConsumoPrestacion>
   </tem:InformarConsumoPrestacion_000006ABM>
</soapenv:Body>
</soapenv:Envelope>`;

proxy.send(message, "http://tempuri.org/IVentas/InformarConsumoPrestacion_000006ABM", function(response, ctx) {
  console.log(response)
});