const mongoose = require('mongoose');

const CommessaClienteSchema = mongoose.Schema({
	_id: {
		type: Number,
		required: true
	},
	id_cliente: {
		type: String,
		required: true
	},
	id_commessa_fnc : {
		type: Number,
		required: true
	},
	codice_commessa:{
		type: String,
		required: true
	},
	nome_commessa:{
		type: String,
		required: true
	},
	budget_euro:{
		type: Number,
		required: false
	},
	budget_gg:{
		type: Number,
		required: false
	},
	codice_offerta:{
		type: String,
		required: false
	},
	codice_ordine:{
		type: String,
		required: false
	},	
	data_inizio_validita:{
		type: Date,
		required: true,
	},
	data_fine_validita:{
		type: Date,
		required: false
	}
});

CommessaClienteSchema.methods.findAll = function findAll(params, callback) {
	return this.model('CommessaCliente').find( { 
		$or: [ { data_fine_validita: null }, { data_fine_validita: { $gte: Date.now() } } ] }).
		where('data_inizio_validita').lte(Date.now()).
		exec(callback);
}

CommessaClienteSchema.methods.findByCliente = function findByCliente(params, callback) {
	return this.model('CommessaCliente').find( { 
		$or: [ { data_fine_validita: null }, { data_fine_validita: { $gte: Date.now() } } ] }).
		where('data_inizio_validita').lte(Date.now()).
		where('id_cliente').equals(params.idCliente).
		exec(callback);
}


const CommessaCliente = module.exports = mongoose.model('CommessaCliente', CommessaClienteSchema); 

