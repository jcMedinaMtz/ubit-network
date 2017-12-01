Vue.component( 'ubit-cotizador', {
    props: {},
    data: function () {
        return {
        tiposCliente: [
            { tipo: 'pequeño', value: 1 },
            { tipo: 'mediano', value: 1.25 },
            { tipo: 'corporativo', value: 1.5 },
            { tipo: 'macroempresa', value: 2 },
        ], tiposCredibilidad: [
            { tipo: 'nula', value: 1 },
            { tipo: 'decente', value: 1.3 },
            { tipo: 'amplio', value: 1.5 },
            { tipo: 'recomendado', value: 1.7 },
            { tipo: 'lo mejor', value: 2 },
        ], tiposImpacto: [
            { tipo: 'nulo', value: 1 },
            { tipo: 'discreto', value:  2 },
            { tipo: 'medio', value: 1.3 },
            { tipo: 'alto', value: 1.5 },
            { tipo: 'mucho', value: 2 },
        ], tiposCompetencia: [
            { tipo: 'nadie', value: 1 },
            { tipo: 'no muchos', value: 1. },
            { tipo: 'algunos', value: 1.5 },
            { tipo: 'varios', value: 1.7 },
            { tipo: 'contactados', value: 2 },
        ],
        tipoCliente: {},
        credibilidad: {},
        impacto: {},
        competencia: {},
        costoHora: 150,
        dias: Number,
        horasDia: Number,
        precioHora: 0
    }
    },
    methods: {
        precioPorHora: function () {
            console.log( this.tipoCliente , this.credibilidad , this.impacto , this.costoHora );
            return ( this.tipoCliente * this.credibilidad * this.impacto * this.costoHora ) / this.competencia;
        },
    },
    template: `<section>
            <div class="form-horizontal">
                <div class="form-group">
                    <label class="control-label">Tipo de cliente</label>
                    <select v-model="this.tipoCliente">
                        <option v-for="cliente in tiposCliente">{{cliente.tipo}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">credibilidad</label>
                    <select v-model="this.credibilidad">
                        <option v-for="credibilidad in tiposCredibilidad">{{credibilidad.tipo}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">impacto</label>
                    <select v-model="this.tiposImpacto">
                        <option v-for="impacto in tiposImpacto">{{impacto.tipo}}</option>
                    </select>
                </div>
                <button @click="precioPorHora()" class="btn btn-success">Calcular</button>
            </div>
            <h3>{{this.precioHora}}</h3>
        </section>`
} );
