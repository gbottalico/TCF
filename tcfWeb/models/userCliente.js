const mongoose = require('mongoose');

const UserClienteSchema = mongoose.Schema({
	_id: {
		type: Number,
		required: true
	},
	id_cliente: {
		type: String,
		required: true
	},
	id_user: {
		type: String,
		required: true
	},
	id_profilo: {
		type: String,
		required: true
	},
	costo: {
		type: Number,
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


const UserCliente = module.exports = mongoose.model('UserCliente', UserClienteSchema); 