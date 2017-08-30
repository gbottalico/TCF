const mongoose = require('mongoose');

const StatoAttivitaSchema = mongoose.Schema({
	_id: {
		type: String,
		required: true
	},
	nome_stato:{
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


StatoAttivitaSchema.methods.findAll = function findAll(params, callback) {
	return this.model('StatoAttivita').find().
		where('data_inizio_validita').lte(Date.now()).
		where('data_fine_validita').gte(Date.now()).
		exec(callback);
}

const StatoAttivita = module.exports = mongoose.model('StatoAttivita', StatoAttivitaSchema); 
