"use strict";

class ConsumoPrestacion {
    constructor(Ambito, CoberturaID, CodigoOperacion, CodigoSede, CuitEmpresa, CuitProfesionalSolicitante, FechaIndicacion, IdEspecialidadSolicitante, 
    NumeroOrdenOriginal, ObservacionesIndicacion, PlanId, Procedimientos, TipoContratacion, TipoOrdenOriginal, PacienteID) {
        this.Ambito = Ambito;
        this.CoberturaID = CoberturaID;
        this.CodigoOperacion = CodigoOperacion;
        this.CodigoSede = CodigoSede;
        this.CuitEmpresa = CuitEmpresa;
        this.CuitProfesionalSolicitante = CuitProfesionalSolicitante;
        this.FechaIndicacion = FechaIndicacion;
        this.IdEspecialidadSolicitante = IdEspecialidadSolicitante;
        this.NumeroOrdenOriginal = NumeroOrdenOriginal;
        this.ObservacionesIndicacion = ObservacionesIndicacion;
        this.PlanId = PlanId;
        this.Procedimientos = Procedimientos;
        this.TipoContratacion = TipoContratacion;
        this.TipoOrdenOriginal = TipoOrdenOriginal;
        this.PacienteID = PacienteID;
    }
}

module.exports = ConsumoPrestacion;