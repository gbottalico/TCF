const mongoose = require('mongoose');

const ProfiloSchema = mongoose.Schema({
	_id: {
		type: String,
		required: true
	},
	nome_profilo:{
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

const Profilo = module.exports = mongoose.model('Profilo', ProfiloSchema); 

function findAll() {
	Profilo.
		find().
		where('data_inizio_validita').lte(Date.now()).
		where('data_fine_validita').gte(Date.now()).
		exec(callback);
}
