const mongoose = require('mongoose');

const CommessaClienteSchema = mongoose.Schema({
	_id: {
		type: Number,
		required: true
	},
	id_cliente : {
		type: String,
		required: true
	},
	id_commessa_fnc : {
		type: Number,
		required: true
	},
	
	id_macro_area : {
		type: String,
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
	},	data_inizio_validita:{
		type: Date,
		required: true,
	},
	data_fine_validita:{
		type: Date,
		required: false
	}
});


const CommessaCliente = module.exports = mongoose.model('CommessaCliente', CommessaClienteSchema); 