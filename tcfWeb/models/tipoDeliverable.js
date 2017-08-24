const mongoose = require('mongoose');

const TipoDeliverableSchema = mongoose.Schema({
	_id: {
		type: String,
		required: true
	},
	nome_deliverable:{
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


const TipoDeliverable = module.exports = mongoose.model('TipoDeliverable', TipoDeliverableSchema); 