const mongoose = require('mongoose');

const ClienteSchema = mongoose.Schema({
	_id: {
		type: String,
		required: true
	},
	nome_cliente:{
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

const Cliente = module.exports = mongoose.model('Cliente', ClienteSchema); 

function findAll() {
	Cliente.
		find().
		where('data_inizio_validita').lte(Date.now()).
		where('data_inizio_validita').gte(Date.now()).
		exec(callback);
}
