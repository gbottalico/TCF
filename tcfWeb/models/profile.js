const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
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


const Profile = module.exports = mongoose.model('Profile', ProfileSchema); 