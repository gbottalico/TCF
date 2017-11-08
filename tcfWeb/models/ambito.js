const mongoose = require('mongoose');

const AmbitoSchema = mongoose.Schema({
	_id: {
		type: Number,
		required: true
	},
	id_cliente: {
		type: String,
		required: true
	},
	nome_ambito	:{
		type: String,
		required: true
	},
	data_inizio_validita:{
		type: Date,
		required: true,
		default: Date.now
	},
	data_fine_validita:{
		type: Date,
		required: false
	}
});

AmbitoSchema.methods.findAll = function findAll(params, callback) {
	return this.model('Ambito').find( { 
		$or: [ { data_fine_validita: null }, { data_fine_validita: { $gte: Date.now() } } ] }).
		where('data_inizio_validita').lte(Date.now()).
		exec(callback);
}

AmbitoSchema.methods.findByCliente = function findByCliente(params, callback) {
	return this.model('Ambito').find( { 
		$or: [ { data_fine_validita: null }, { data_fine_validita: { $gte: Date.now() } } ] }).
		where('data_inizio_validita').lte(Date.now()).
		where('id_cliente').equals(params.idCliente).
		exec(callback);
}

const Ambito = module.exports = mongoose.model('Ambito', AmbitoSchema); 