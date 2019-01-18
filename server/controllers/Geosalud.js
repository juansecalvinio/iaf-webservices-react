require('dotenv').config();
const tunnel = require('tunnel-ssh');
const mysql = require('mysql');


const conectarTunel = () => {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            tunnel({
                // host: process.env.TUNNEL_HOST,
                // port: process.env.TUNNEL_PORT,
                // dstHost: process.env.TUNNEL_DEST_HOST,
                // dstPort: process.env.TUNNEL_DEST_PORT,
                // localHost: process.env.TUNNEL_LOCAL_HOST,
                // localPort: process.env.TUNNEL_LOCAL_PORT,
                // username: process.env.TUNNEL_USERNAME,
                // password: process.env.TUNNEL_PASSWORD
                host: '172.27.184.7',
                port: 22,
                dstHost: '172.27.184.11',
                dstPort: 3306,
                localHost: '127.0.0.1',
                localPort: 3334,
                username: 'root',
                password: 'Claro.2017'
            }, (err) => {
                if(err) reject(err);
                console.log('Tunnel connected.');
                // Conexion a GEOSalud
                let conexion = mysql.createConnection({
                    host: process.env.GEOSALUD_HOST,
                    port: process.env.GEOSALUD_PORT,
                    user: process.env.GEOSALUD_USER,
                    password: process.env.GEOSALUD_PASS,
                    database: process.env.GEOSALUD_DB
                });
                conexion.on('error', err => {
                    conexion.end();
                    reject(err);
                });
                conexion.connect((err) => {
                    if(err) {
                        conexion.end();
                        reject(err);
                    }
                    resolve(conexion);
                })
            })
        }, 100);
    });
}

// Obtener Consumos de GEOSalud
function APIObtenerConsumos(req, res) {
    const TipOsId = req.query.tiposid;
    const OsId = req.query.osid;
    var query = `select o.OSAmbito as Ambito, p.PrestCodInt as CoberturaID, ospersprestorigid, concat('LIQUIDACION;', now()) as CodigoOperacion,
    1 as CodigoSede, ifnull (PrestNroTribut, 30546741253) as CuitEmpresa, ifnull (em.EMPRUC, o.OSRRHHDerivId) as CuitProfesionalSolicitante,
    OSfChHOR as FechaIndicacion, osrolid as IdEspecialidadSolicitante, o.osid as NumeroOrdenOriginal, '' as ObservacionesIndicacion,
    pp.PrestPlanPlanComSistExtId as PlanId, true as Acreditado, 1.00 as Cantidad, ACTASISTID as Codigo, a.ActAsistDesc as Practica, false as CodigoEstadoTransaccion,
    ifnull(em.EMPRUC, 0) as CuitProfesionalResponsable, OSfChHOR as Fecha, OSfChHOR as FechaGestion, false as HabilitaAjusteCargos, R.ROLID as IdEspecialidadResponsable,
    0.00 as MontoIVAFinan, 0.00 as MontoIVAPaciente, 0.00 as MontoNetoFinan, 0.00 as MontoNetoPaciente, 0.00 as MontoTarifa, 0.00 as MontoTotalFinan,
    0.00 as MontoTotalPaciente, 0.00 as PorcentajeCobertura, 0.00 as PorcentajePaciente, false as RequiereAutorizacion, 'P' as Tipo, true as Vigencia,
    pl.PERSPLANTIPCONTRATID as TipoContratacion, o.tipOSId as TipoOrdenOriginal, OSPersId as PacienteID
    from geosalud.os o
    left join rrhh rh on o.osrrhhid = rh.rrhhid
    left join osindicact oi on o.tiposid = oi.tiposid and o.osid = oi.osid
    left join actasist a on a.actasistid = oi.osindicactactasistid
    left join plancom pc on o.osplancomid = pc.plancomid
    left join roles r on o.osrolid = r.rolid
    left join estos e on e.EstOSId = o.OSUltEstOsId
    left join empresas em on em.empid = rh.empid
    left join persplan pl on pl.persplanpersid = o.ospersid and pl.persplanplancomid = pc.plancomid
    left join prestadores p on pl.persplanprestid = p.prestid and o.ospersprestorigid = p.prestid
    left join prestplan pp on pc.PlanComId = pp.PlanComId and pp.PrestId = p.PrestId
    left join tipcontrat tc on tc.tipcontratid = pl.persplantipcontratid
    left join sectores s on o.ossectid = s.sectid
    where PrestSistExtId != ''
    and o.tiposid = ${TipOsId} and o.osid = ${OsId};`;
    conectarTunel().then((conexion) => {
        conexion.query(query, (error, resultado) => {
            if (error) {
                res.status(404).send(`Hubo un problema consultando los consumos: ${error}`);
                conexion.end();
            } else {
                const response = {
                    'consumos': JSON.parse(JSON.stringify(resultado))
                }
                res.send(response);
                conexion.end();
            }
        });
    }).catch((err) => {
        res.status(404).send('Hubo un error en la conexion de la BD GEOSalud', err);
        conexion.end();
    });
}

// Obtener Procedimientos de un consumo de GEOSalud
function APIObtenerProcedimientos(TipOsId, OsId) {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            var procedimientos = [];
            var query = `select true as Acreditado, 1.00 as Cantidad, ACTASISTID as Codigo, 1 as CodigoAutorizacion,
            false as CodigoEstadoTransaccion, ifnull(EMPRUC, 0) as CuitProfesionalResponsable, OSfChHOR as Fecha, OSfChHOR as FechaGestion,
            false as HabilitaAjusteCargos, R.ROLID as IdEspecialidadResponsable, 0.00 as MontoIVAFinan, 0.00 as MontoIVAPaciente,
            0.00 as MontoNetoFinan, 0.00 as MontoNetoPaciente, 0.00 as MontoTarifa, 0.00 as MontoTotalFinan, 0.00 as MontoTotalPaciente,
            0.00 as PorcentajeCobertura, 0.00 as PorcentajePaciente, false as RequiereAutorizacion, 'P' as Tipo, true as Vigencia
            from geosalud.os o
            left join rrhh rh on o.osrrhhid = rh.rrhhid
            left join osindicact oi on o.tiposid = oi.tiposid and o.osid = oi.osid
            left join actasist a on a.actasistid = oi.osindicactactasistid
            left join plancom pc on o.osplancomid = pc.plancomid
            left join roles r on o.osrolid = r.rolid
            left join estos e on e.EstOSId = o.OSUltEstOsId
            left join empresas em on em.empid = rh.empid
            left join persplan pl on pl.persplanpersid = o.ospersid and pl.persplanplancomid = pc.plancomid
            left join prestadores p on pl.persplanprestid = p.prestid and o.ospersprestorigid = p.prestid
            left join tipcontrat tc on tc.tipcontratid = pl.persplantipcontratid
            left join sectores s on o.ossectid = s.sectid
            where PrestSistExtId != ''
            and o.tiposid = ${TipOsId} and o.osid = ${OsId};`;
            conectarTunel().then((conexion) => {
                conexion.query(query, (error, resultado) => {
                    if(error) {
                        reject(`Hubo un problema consultando los consumos: ${error}`);
                        conexion.end();
                    } else {
                        var response = {
                            'resultadoProdecimientos': JSON.parse(JSON.stringify(resultado))
                        }
                        response.resultadoProdecimientos.forEach(procedimiento => {
                            procedimientos.push(procedimiento);
                        });
                        resolve(procedimientos);
                        conexion.end();
                    }
                });
            }).catch((err) => {
                reject(`Hubo un error conectando la BD GEOSalud ${err}`);
                conexion.end();
            });
            
        }, 100);
    });
}


module.exports = {
    obtenerConsumos: APIObtenerConsumos,
    obtenerProcedimientos: APIObtenerProcedimientos
}