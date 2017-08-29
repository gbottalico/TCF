const mongoose = require('mongoose');

const SedeSchema = mongoose.Schema({
	_id: {
		type: String,
		required: true
	},
	nome_sede:{
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

const Sede = module.exports = mongoose.model('Sede', SedeSchema); 

SedeSchema.methods.findAll = function findAll() {
	return this.model('Sede').find().
		where('data_inizio_validita').lte(Date.now()).
		where('data_fine_validita').gte(Date.now()).
		exec(callback);
}
