const mongoose = require('mongoose');

const CommessaFinconsSchema = mongoose.Schema({
	_id: {
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
	budget_euro: {
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


const CommessaFincons = module.exports = mongoose.model('CommessaFincons', CommessaFinconsSchema); 