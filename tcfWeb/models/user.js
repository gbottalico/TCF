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
			},
			data_inizio_validita_cliente: {
				type : Date,
				required: false
			},
			data_fine_validita_cliente: {
				type : Date,
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
					isAdmin : "$isAdmin",
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
					isAdmin: '$isAdmin',
					id_cliente: '$clienti.id_cliente',
				}	
			},
			{
				$group : {
					_id : "$_id",
					isAdmin : {
						$last : '$isAdmin',
					},
					clienti : {
						$push : 
							'$id_cliente'
					}
				}
			}
		];
	
		return User.aggregate(query).exec(callback);
}
const User = module.exports = mongoose.model('User', UserSchema); 