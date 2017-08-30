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

TipoDeliverableSchema.methods.findAll = function findAll(params, callback) {
	return this.model('TipoDeliverable').find().
		where('data_inizio_validita').lte(Date.now()).
		where('data_fine_validita').gte(Date.now()).
		exec(callback);
}

const TipoDeliverable = module.exports = mongoose.model('TipoDeliverable', TipoDeliverableSchema); 

