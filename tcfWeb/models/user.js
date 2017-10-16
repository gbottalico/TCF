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
				type : String,
				required: false
			},
			id_profilo : {
				type : String,
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

UserSchema.methods.getUsersByClient = function getUsersByClient(params, callback) {
	
		mongoose.set('debug', true);
		var query = [
			{				
				"$project":
				{
					clienti: {
						$filter: {
							input: '$clienti',
							as: 'item',
							cond: {$eq: ['$$item.id_profilo', 'AP']}
						}	
					}
				}
			},
			{
				"$match":{
					"_id": params.idUser
				}
			},
			{
				$unwind : '$clienti'
			},
			{
				$project:{
					id_cliente: '$clienti.id_cliente'
				}	
			},
			{
				$group : {
					_id : "$_id",
					clienti : {
						$push : 
							'$id_cliente'
						
					}
				}
			}
		];
	
		return User.aggregate(query).exec(callback);
}

UserSchema.methods.getMaxProfile = function getMaxProfile(params, callback) {
	
		mongoose.set('debug', true);
		var query = [
			{				
				"$project":
				{
					profilo: '$clienti.id_profilo',
				}
			},
			{
				"$match":{
					"_id": params.idUser
				}
			},{
				"$project":{
					_id:false
				}
			}			
		];
	
		return User.aggregate(query).exec(callback);
}

const User = module.exports = mongoose.model('User', UserSchema); 