const mongoose = require('mongoose');

const MenuEntrySchema = mongoose.Schema({
	_id: {
		type: String,
		required: true
    },
    title_menu:{
		type: String,
		required: true
	},
	desc_menu:{
		type: String,
		required: false
    },
    url:{
		type: String,
		required: true
    },
    profile:{
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

MenuEntrySchema.methods.findAll = function findAll(params, callback) {
	return this.model('MenuEntry').find( { 
		$or: [ { data_fine_validita: null }, { data_fine_validita: { $gte: Date.now() } } ] }).
		where('data_inizio_validita').lte(Date.now()).
		exec(callback);
}

const MenuEntry = module.exports = mongoose.model('MenuEntry', MenuEntrySchema); 