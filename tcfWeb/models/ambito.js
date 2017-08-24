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