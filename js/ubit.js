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
            { tipo: 'No los conocia', value: 1, desc: 0 },
            { tipo: 'Redes Sociales', value: 1.3, desc: 5 },
            { tipo: 'Reuniones de Networking', value: 1.5, desc: 10 },
            { tipo: 'Recomendación', value: 1.7, desc: 15 },
            { tipo: 'Ya he trabajado con ustedes', value: 2, desc: 20 },
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
        ],tiposUrgencia: [
            { tipo: 'nula', value: 1 },
            { tipo: 'poca', value:  2 },
            { tipo: 'medio', value: 1.3 },
            { tipo: 'alto', value: 1.5 },
            { tipo: 'mucho', value: 2 },
        ],
        tipoCliente: 0,
        tipoCredibilidad: 1,
        tipoImpacto: 0,
        competencia: 1,
        costoHora: 60,
        dias: 0,
        horasDia: 0,
        precioHora: 0,
        cantidadDevs: 1,
        meses: 3,
        precioCalculado: 0
    }
    },
    methods: {
        precioPorHora: function () {
            var costo = ( this.tipoCliente * 1.7 * this.tipoImpacto * this.costoHora ) / 1.7;
            if ( !isNaN( costo ) ) {
                this.precioCalculado = ( ( ( ( costo * 3 ) * 5 ) * 4 ) * this.cantidadDevs ) * this.meses;
            } else {
                this.precioCalculado = 0;
            }
        },
    },
    template:
        `<section class="container-fluid">
            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <h2>Tamaño de tu empresa</h2>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <template v-for="tCliente in tiposCliente">
                                    <input name="tipocliente" type="radio" v-model="tipoCliente" :id="'cliente_' + tCliente.value" :value="tCliente.value"></input>
                                    <label :for="'cliente_' + tCliente.value">{{tCliente.tipo}}</label>
                                </template>
                            </div>
                        </div><div class="clear"></div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <h2>Impacto del Proyecto</h2>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <template v-for="tImpacto in tiposImpacto">
                                    <input name="tipoimpacto" type="radio" v-model="tipoImpacto" :id="'impacto_' + tImpacto.value" :value="tImpacto.value"></input>
                                    <label :for="'impacto_' + tImpacto.value">{{tImpacto.tipo}}</label>
                                </template>
                            </div>
                        </div><div class="clear"></div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <h2>Describre brevemente tu proyecto:</h2>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <textarea name="message" id="message" placeholder="..." rows="6"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <h2>¿Cómo nos conocímos?</h2>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <template v-for="tCredibilidad in tiposCredibilidad">
                                    <input name="tipocredibilidad" type="radio" v-model="tipoCredibilidad" :id="'credibilidad_' + tCredibilidad.value"></input>
                                    <label :for="'credibilidad_' + tCredibilidad.value">{{tCredibilidad.tipo}}</label>
                                </template>
                            </div>
                        </div><div class="clear"></div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <h2>¿Cuántos programadores quieres en tu proyecto?</h2>
                            </div>
                            <div class="col-lg-11 col-md-11 col-sm-11 col-xs-11">
                                <input class="block" v-model="cantidadDevs" type="range" min="1" max="10">
                            </div>
                            <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                <h3>{{cantidadDevs}}</h3>
                            </div>
                        </div><div class="clear"></div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <h2>¿En cuánto tiempo esperas tener listo tu proyecto? (mínimo 3 meses)</h2>
                            </div>
                            <div class="col-lg-11 col-md-11 col-sm-11 col-xs-11">
                                <input class="block" v-model="meses" type="range" min="3" max="12">
                            </div>
                            <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                <h3>{{meses}}</h3>
                            </div>
                        </div><div class="clear"></div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                <a role="button" class="button special block" @click="precioPorHora()">Calcular precio</a>
                <h3>Costo aproximado: <br>$ {{precioCalculado}}</h3>
        </section>`
} );
