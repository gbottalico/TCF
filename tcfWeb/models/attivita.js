const mongoose = require('mongoose');

const AttivitaSchema = mongoose.Schema({

	id_ambito: {
		type: String,
		required: true
	},
	id_commessa_cliente: {
		type: String,
		required: true
	},
	id_stato_attivita: {
		type: String,
		required: true
	},
	nome_attivita: {
		type: String,
		required: true
	},
	codice_attivita: {
		type: String,
		required: true
	},
	descrizione: {
		type: String,
		required: false
	},
	budget_euro: {
		type: Number,
		required: false
	}, 
	budget_gg: {
		type: Number,
		required: true
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

AttivitaSchema.methods.findAll = function findAll(params, callback) {
	return this.model('Attivita').find( { 
		$or: [ { data_fine_validita: null }, { data_fine_validita: { $gte: Date.now() } } ] }).
		where('data_inizio_validita').lte(Date.now()).
		exec(callback);
}

AttivitaSchema.methods.findByCommessaClienteAndAmbito = function findByCommessaClienteAndAmbito(params, callback) {
	return this.model('Attivita').find( { 
		$or: [ { data_fine_validita: null }, { data_fine_validita: { $gte: Date.now() } } ] }).
		where('data_inizio_validita').lte(Date.now()).
		where('id_commessa_cliente').equals(params.idCommessaCliente).
		where('id_ambito').equals(params.idAmbito).
		exec(callback);
}

const Attivita = module.exports = mongoose.model('Attivita', AttivitaSchema); 