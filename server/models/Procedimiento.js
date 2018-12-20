"use strict";

class Procedimiento {
    constructor(Acreditado, Cantidad, Codigo, CodigoAutorizacion, CodigoEstadoTransaccion, CuitProfesionalResponsable, Fecha, FechaGestion, HabilitaAjusteCargos,
    IdEspecialidadResponsable, MontoIVAFinan, MontoIVAPaciente, MontoNetoFinan, MontoNetoPaciente, MontoTarifa, MontoTotalFinan, MontoTotalPaciente,
    PorcentajeCobertura, PorcentajePaciente, RequiereAutorizacion, Tipo, Vigencia) {
        this.Acreditado = Acreditado,
        this.Cantidad = Cantidad,
        this.Codigo = Codigo,
        this.CodigoAutorizacion = CodigoAutorizacion,
        this.CodigoEstadoTransaccion = CodigoEstadoTransaccion,
        this.CuitProfesionalResponsable = CuitProfesionalResponsable,
        this.Fecha = Fecha,
        this.FechaGestion = FechaGestion,
        this.HabilitaAjusteCargos = HabilitaAjusteCargos,
        this.IdEspecialidadResponsable = IdEspecialidadResponsable,
        this.MontoIVAFinan = MontoIVAFinan,
        this.MontoIVAPaciente = MontoIVAPaciente,
        this.MontoNetoFinan = MontoNetoFinan,
        this.MontoNetoPaciente = MontoNetoPaciente,
        this.MontoTarifa = MontoTarifa,
        this.MontoTotalFinan = MontoTotalFinan,
        this.MontoTotalPaciente = MontoTotalPaciente,
        this.PorcentajeCobertura = PorcentajeCobertura,
        this.PorcentajePaciente = PorcentajePaciente,
        this.RequiereAutorizacion = RequiereAutorizacion,
        this.Tipo = Tipo,
        this.Vigencia = Vigencia
    }
}

module.exports = Procedimiento;
