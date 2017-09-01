const mongoose = require('mongoose');

const ConsuntivoSchema = mongoose.Schema({
    _id: {
		type: String, 
		required: true
	}, 
	data_consuntivo: { 
		type: Date, 
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
	}
});

ConsuntivoSchema.methods.findByClienteAndData = function findByClienteAndData(params, callback) {
	return this.model('Consuntivo').find().
		where('data_consuntivo').equals(new Date(2017,08,31)).
		where('id_cliente').equals(params.idCliente).
		exec(callback);
}

const Consuntivo = module.exports = mongoose.model('Consuntivo', ConsuntivoSchema); 
