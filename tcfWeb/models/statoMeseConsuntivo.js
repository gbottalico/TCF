const mongoose = require('mongoose');

const StatoMeseConsuntivoSchema = mongoose.Schema({
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


StatoMeseConsuntivoSchema.methods.findAll = function findAll(params, callback) {
	return this.model('StatoMeseConsuntivo').find( { 
		$or: [ { data_fine_validita: null }, { data_fine_validita: { $gte: Date.now() } } ] }).
		where('data_inizio_validita').lte(Date.now()).
		exec(callback);
}

const StatoMeseConsuntivo = module.exports = mongoose.model('StatoMeseConsuntivo', StatoMeseConsuntivoSchema); 
