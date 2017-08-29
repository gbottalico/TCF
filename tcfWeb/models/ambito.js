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
	},
	data_fine_validita:{
		type: Date,
		required: false
	}
});


const Ambito = module.exports = mongoose.model('Ambito', AmbitoSchema); 

function findAll() {
	Ambito.
		find().
		where('data_inizio_validita').lte(Date.now()).
		where('data_fine_validita').gte(Date.now()).
		exec(callback);
}

function findByCliente(idCliente) {
	Ambito.
		find().
		where('data_inizio_validita').lte(Date.now()).
		where('data_fine_validita').gte(Date.now()).
		where('id_cliente').equals(idCliente).
		exec(callback);
}