const mongoose = require('mongoose');

const ConsuntivoSchema = mongoose.Schema({
    _id: {
		type: Number, 
		required: true
	}, 
	anno_consuntivo: { 
		type: Number, 
		required: true
	},
	mese_consuntivo: { 
		type: Number, 
		required: true
	},
	id_cliente: {
		type: String,
		required: true
	},
	nome_cliente: {
		type: String,
		required: true
	},
	id_ambito: {
		type: Number,
		required: true
	},
	nome_ambito: {
		type: String,
		required: true
	},
	id_macro_area: {
		type: String,
		required: true
	},
	nome_macro_area: {
		type: String,
		required: true
	},
	id_attivita: {
		type: Number,
		required: true
	},
	nome_attivita: {
		type: String,
		required: true
	},
	id_tipo_deliverable: {
		type: String,
		required: true
	},
	nome_tipo_deliverable: {
		type: String,
		required: true
	},
	note: {
		type: String,
		required: false
	},
	dettagli: [
		{
			giorno: {
				type : Number,
				required: false
			},
			ore : {
				type : Number,
				required: false
			}
		}
	],

});

var entitySchema = mongoose.Schema({
    testvalue: {type: String}
});

entitySchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.testvalue = counter.seq;
        next();
    });
});

ConsuntivoSchema.methods.findByClienteAnnoAndMese = function findByClienteAnnoAndMese(params, callback) {
	return this.model('Consuntivo').find().
		where('anno_consuntivo').equals(params.anno).
		where('mese_consuntivo').equals(params.mese).
		where('id_cliente').equals(params.idCliente).
		exec(callback);
}

const Consuntivo = module.exports = mongoose.model('Consuntivo', ConsuntivoSchema); 
