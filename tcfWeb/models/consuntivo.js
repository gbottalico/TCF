const mongoose = require('mongoose');
const Transaction = require('mongoose-transactions');


const ConsuntivoSchema = mongoose.Schema({
	data_consuntivo: {
		type: Date,
		required: true
	},
	id_utente: {
		type: String,
		required: true
	},
	nome_utente: {
		type: String,
		required: true
	},
	id_ambito: {
		type: Number,
		required: true
	},
	nome_ambito: {
		type: String,
		required: true
	},
	id_macro_area: {
		type: String,
		required: true
	},
	nome_macro_area: {
		type: String,
		required: true
	},
	id_attivita: {
		type: Number,
		required: true
	},
	nome_attivita: {
		type: String,
		required: true
	},
	id_tipo_deliverable: {
		type: String,
		required: true
	},
	nome_tipo_deliverable: {
		type: String,
		required: true
	},
	note: {
		type: String,
		required: false
	},
	ore: {
		type: Number,
		required: true
	}
});

ConsuntivoSchema.methods.findByClienteAndData = function findByClienteAndData(params, callback) {
	return this.model('Consuntivo').find().
		where('data_consuntivo').equals(params.data).
		where('id_cliente').equals(params.idCliente).
		exec(callback);
}

ConsuntivoSchema.methods.findBetweenDates = function findBetweenDates(params, callback) {
	return this.model('Consuntivo').find().
		where('data_consuntivo').gte(params.start).
		where('data_consuntivo').lte(params.end).
		exec(callback);
}

ConsuntivoSchema.methods.getRowsForExcel = function getRowsForExcel(params, callback) {


	console.log(params.start + " " + params.end);
	var query = [
		{
			"$match": {
				"data_consuntivo": { "$lte": params.start, "$gte": params.end }
			}
		},
		{
			"$group": {
				_id: {
					"data_consuntivo": "$data_consuntivo",
					"cliente": "$nome_cliente",
					"ambito": "$nome_ambito",
					"macro_area": "$nome_macro_area",
					"attivita": "$nome_attivita",
					"deliverable": "$nome_tipo_deliverable",
					"ore": "$ore"

				},
				//"count": { "$sum": 1 }
			}
		},
		{
			"$group": {
				"_id": "$_id.data_consuntivo",
				"info_consuntivo": {
					"$push": {
						"cliente": "$_id.cliente",
						"ambito": "$_id.ambito",
						"macro_area": "$_id.macro_area",
						"attivita": "$_id.attivita",
						"deliverable": "$_id.deliverable",
						"ore": "$_id.ore"
					}
				}
			}
		}
	];

	Consuntivo.aggregate(query, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			return result;
		}
	});

}

//CRUD - READ
ConsuntivoSchema.methods.getConsuntiviUtente = function getConsuntiviUtente(params, callback) {

	console.log("user: " + params.id_user + " month: " + params.month + "/" + params.year);
	mongoose.set('debug', true);
	var query = [
		{
			"$project":
			{
				doc: "$$ROOT",
				year: { $cond: ["$data_consuntivo", { $year: "$data_consuntivo" }, -1] },
				month: { $cond: ["$data_consuntivo", { $month: "$data_consuntivo" }, -1] },
				day: { $cond: ["$data_consuntivo", { $dayOfMonth: "$data_consuntivo" }, -1] },
				user: "$id_utente"
			}
		},
		{
			"$match": {
				"month": new Number(params.month).valueOf(),
				"year": new Number(params.year).valueOf(),
				"user": params.id_user
			}
		}
	];

	return Consuntivo.aggregate(query).exec(callback);
}

ConsuntivoSchema.methods.addConsuntiviUtente = function addConsuntiviUtente(consuntiviUtente, callback) {
	try {
		console.log("addConsuntiviUtente ");

		var transaction = new Transaction();
		var query;

		for (var i = 0; i < consuntiviUtente.body.length; i++) {
			if (consuntiviUtente.body[i]._id != null) {
				transaction.update('Consuntivo', consuntiviUtente.body[i]._id, consuntiviUtente.body[i]);
			} else {
				transaction.insert('Consuntivo', consuntiviUtente.body[i]);
			}
		}

		transaction.run(callback);

	} catch (error) {
		console.error(error)
		const rollbackObj = transaction.rollback().catch(console.error) 
		transaction.clean(callback);	
	}
}


const Consuntivo = module.exports = mongoose.model('Consuntivo', ConsuntivoSchema); 
