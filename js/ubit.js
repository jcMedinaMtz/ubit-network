Vue.component( 'ubit-cotizador', {
    props: {},
    data: function () {
        return {
            tiposCliente: [
                { tipo: 'pequeño', value: 1, info: 'Empresa pequeña, de pocos empleados, trabajadora. Vive y deja vivir.' },
                { tipo: 'mediano', value: 1.25, info: 'Empresa mediana a grande, buena solvencia económica, no tiene muchos empleados, no es líder de su industria.' },
                { tipo: 'corporativo', value: 1.5, info: 'Corporativo de mucha lana, tiene varias decenas de empleados, bonitas oficinas, es reconocido como uno de los líderes del mercado.' },
                { tipo: 'macroempresa', value: 2, info: 'Corporativo de muchísima lana, y además, el dueño se apellida Slim.' },
            ], tiposCredibilidad: [
                { tipo: 'No los conocia', value: 1, desc: 0.0, info: 'No tenemos el gusto de conocernos, te recomendamos nos contactes y platiquemos en persona para ayudarte en tu proyecto. El café va por nuestra cuenta.' },
                { tipo: 'Redes Sociales', value: 1.3, desc: 0.20, info: 'Si nos encontraste por redes sociales, búsqueda por internet o publicidad similar, dános un like y mandanos un mensaje para platicar mejor de tu idea y ver como te podemos ayudar.' },
                { tipo: 'Recomendación', value: 1.5, desc: 0.25, info: 'Te hemos sido recomendados por una fuente de confianza o has visto nuestros casos de éxito, por lo que ya sabes de que forma podemos particiar en tu proyecto. Grácias por la confianza!' },
                { tipo: 'Reuniones de Networking', value: 1.7, desc: 0.30, info: 'De emprendedor a emprendedor, ya sabes quienes somos y como podemos ayudarte. Démosle seguimiento a tu proyecto y hagámoslo crecer.' },
                { tipo: 'Ya he trabajado con ustedes', value: 2, desc: 0.35, info: 'Para nosotros ya no eres un cliente, somos amigos. Has visto con tus propios ojos nuestro trabajo y estamos listos para ayudarte en el siguiente.' },
            ], tiposImpacto: [
                { tipo: 'nulo', value: 1 , info: 'Nulo impacto, si este proyecto se lleva o no se lleva a cabo nadie se dará cuenta.' },
                { tipo: 'discreto', value:  1.2 , info: 'De imagen, discreto, más bien un proyecto de comunicación con poca difusión.' },
                { tipo: 'medio', value: 1.3 , info: 'Proyecto corporativo, harán anuncios en prensa y otros medios para difundirlo.' },
                { tipo: 'alto', value: 1.5 , info: 'Con impacto, el sistema proporcionará información para toma de decisiones.' },
                { tipo: 'mucho', value: 2 , info: 'Mucho impacto, algunos de sus procesos se modificarán y estarán dictados por el sistema que debo crear, además le haré ganar dinero a la empresa. De no funcionar correctamente, tendré al cliente encima' },
            ], tiposCompetencia: [
                { tipo: 'nadie', value: 1 },
                { tipo: 'no muchos', value: 1.3 },
                { tipo: 'algunos', value: 1.4 },
                { tipo: 'varios', value: 1.7 },
                { tipo: 'contactados', value: 2 },
            ],tiposUrgencia: [
                { tipo: 'nula', value: 1 },
                { tipo: 'poca', value:  1.25 },
                { tipo: 'medio', value: 1.5 },
                { tipo: 'alto', value: 1.75 },
                { tipo: 'mucho', value: 2 },
            ],
            tipoCliente: 0,
            tipoCredibilidad: 0,
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
        descripcionImpacto: function () {
            var ti = this.tipoImpacto;
            if ( this.tipoImpacto !== undefined && this.tipoImpacto > 0 ) {
                var obj = _.find( this.tiposImpacto, function ( o ) {
                    return o.value == ti;
                } );
                return obj.info;
            }
        },
        descripcionCredibilidad: function () {
            var cred = this.tipoCredibilidad;
            if ( this.tipoCredibilidad !== undefined && this.tipoCredibilidad > 0 ) {
                var obj = _.find( this.tiposCredibilidad, function ( o ) {
                    return o.value == cred;
                } );
                return obj.info;
            }
        },
        valDescuento: function() {
            var cred = this.tipoCredibilidad;
            if (cred == 0 ) {
                return 0;
            } else {
                var desc = _.find( this.tiposCredibilidad, function ( o ) {
                    return o.value == cred;
                } )
                return desc.desc;
            }
        },
        factorUrgencia: function() {
            var x1 = 1;
            var x2 = 1.5;
            var y1 = 52;
            var y2 = 12;
            var m = ( y2 - x2 ) / ( y1 - x1 );
            var b = x2 - ( m * x1 );
            var y = ( m * this.semanas ) + b;
            return y;
        },
        valorAnalisis: function () {
            return ( this.tipoCliente * 1.7 * 2 * this.costoHora ) / 1.7;
        },
        precioPorHora: function () {
            if ( this.tipoCliente !== 0 && this.tipoImpacto !== 0 && this.tipoCredibilidad !== 0 ) {
                var costoHra = ( this.tipoCliente * 1.7 * this.tipoImpacto * this.costoHora ) / 1.7;
                var costoUrgencia = costoHra * this.factorUrgencia;
                var costoDescuento = costoUrgencia - ( costoUrgencia * this.valDescuento );
                var costoGrupo = costoDescuento * this.cantidadDevs;
                var costoTiempo = ( costoGrupo * 20 ) * this.semanas;
                var subTotal = costoTiempo;
                var total = _.ceil( subTotal );
                return total;
            } else {
                return 0;
            }
        },
    },
    template: `#calculadora`
} );
