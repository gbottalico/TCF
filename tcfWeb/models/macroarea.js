const mongoose = require('mongoose');

const MacroAreaSchema = mongoose.Schema({
	_id: {
		type: String,
		required: true
	},
	nome_macro_area:{
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

const MacroArea = module.exports = mongoose.model('MacroArea', MacroAreaSchema); 

function findAll() {
	MacroArea.
		find().
		where('data_inizio_validita').lte(Date.now()).
		where('data_fine_validita').gte(Date.now()).
		exec(callback);
}