const mongoose = require('mongoose');

const AttivitaSchema = mongoose.Schema({
	_id: {
		type: Number,
		required: true
	},
	id_ambito: {
		type: Number,
		required: true
	},
	id_commessa_cliente: {
		type: Number,
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


const Attivita = module.exports = mongoose.model('Attivita', AttivitaSchema); 

function findAll() {
	Attivita.
		find().
		where('data_inizio_validita').lte(Date.now()).
		where('data_inizio_validita').gte(Date.now()).
		exec(callback);
}

function findByCommessaClienteAndAmbito(idCommessaCliente, idAmbito) {
	Attivita.
		find().
		where('data_inizio_validita').lte(Date.now()).
		where('data_fine_validita').gte(Date.now()).
		where('id_commessa_cliente').equals(idCommessaCliente).
		where('id_ambito').equals(idAmbito).
		exec(callback);
}