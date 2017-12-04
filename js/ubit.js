Vue.component( 'ubit-cotizador', {
    props: {},
    data: function () {
        return {
            tiposCliente: [
                { tipo: 'pequeño', value: 1, info: 'Empresa pequeña, de pocos empleados, trabajadora. Vive y deja vivir.'
                },
                { tipo: 'mediano', value: 1.25, info: 'Empresa mediana a grande, buena solvencia económica, no tiene muchos empleados, no es líder de su industria.'
                },
                { tipo: 'corporativo', value: 1.5, info: 'Corporativo de mucha lana, tiene varias decenas de empleados, bonitas oficinas, es reconocido como uno de los líderes del mercado.'
                },
                { tipo: 'macroempresa', value: 2, info: 'Corporativo de muchísima lana, y además, el dueño se apellida Slim.'
                },
            ], tiposCredibilidad: [
                { tipo: 'No los conocia', desc: 0.05 },
                { tipo: 'Redes Sociales', desc: 0.10 },
                { tipo: 'Reuniones de Networking', desc: 0.15 },
                { tipo: 'Recomendación', desc: 0.20 },
                { tipo: 'Ya he trabajado con ustedes', desc: 0.25 },
            ], tiposImpacto: [
                { tipo: 'nulo', value: 1 },
                { tipo: 'discreto', value:  1.2 },
                { tipo: 'medio', value: 1.3 },
                { tipo: 'alto', value: 1.5 },
                { tipo: 'mucho', value: 2 },
            ], tiposCompetencia: [
                { tipo: 'nadie', value: 1 },
                { tipo: 'no muchos', value: 1.3 },
                { tipo: 'algunos', value: 1.4 },
                { tipo: 'varios', value: 1.7 },
                { tipo: 'contactados', value: 2 },
            ],tiposUrgencia: [
                { tipo: 'nula', value: 1 },
                { tipo: 'poca', value:  1.2 },
                { tipo: 'medio', value: 1.3 },
                { tipo: 'alto', value: 1.5 },
                { tipo: 'mucho', value: 2 },
            ],
            tipoCliente: 0,
            tipoCredibilidad: 1,
            tipoImpacto: 0,
            costoHora: 60,
            cantidadDevs: 1,
            semanas: 12,
            descuento: 0,
        }
    },
    computed: {
        descripcionCliente: function () {
            var tc = this.tipoCliente;
            if ( this.tipoCliente !== undefined && this.tipoCliente > 0 ) {
                var obj = _.find( this.tiposCliente, function ( o ) {
                    return o.value == tc;
                } );
                return obj.info;
            }
        },
        precioPorHora: function () {
            var costoHra = ( this.tipoCliente * 1.7 * this.tipoImpacto * this.costoHora ) / 1.7;
            var precioTiempo = this.costoSemanal( costoHra ) * this.semanas;
            var precioGrupo = precioTiempo * this.cantidadDevs;
            var subTotal = ( precioGrupo - this.descCalculado( precioGrupo ) ) + this.valorAnalisis( costoHra ) ;
            var total = this.calcularUrgencia( subTotal );
            return total;
        },
    },
    methods: {
        calcularUrgencia: function( costo ) {
            var x1 = 1;
            var x2 = 1.5;
            var y1 = 52;
            var y2 = 1;
            var m = ( y2 - x2 ) / ( y1 - x1 );
            var b = x2 - ( m * x1 );
            var y = ( m * this.semanas ) + b;
            return costo * y;
        },
        costoSemanal: function ( costo ) {
            return _.ceil( costo * 3 ) * 5;
        },
        valorAnalisis: function ( costo ) {
            return _.ceil( costo * ( this.semanas / 3 ) );
        },
        descCalculado: function ( precio ) {
            return _.ceil( precio * this.descuento )
        },
    },
    template: `#calculadora`
} );
