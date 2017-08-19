const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	_id: {
		type: String,
		required: true
	},
	id_sede:{
		type: Number,
		required: false
	},
	password:{
		type: String,
		required: true
	},
	cognome:{
		type: String,
		required: true
	},
	nome:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	data_inizio_validita:{
		type: Date,
		required: true,
		default: Date.now
	},
	data_fine_validita:{
		type: Date,
		required: false
	},
	clienti: [
		{
			id_cliente: {
				type : Number,
				required: false
			},
			id_profilo : {
				type : Number,
				required: false
			}
		}
	],
	isAdmin: {
		type: Boolean,
		required: true,
		default: false
	}

});


const User = module.exports = mongoose.model('User', UserSchema); 