const mongoose = require('mongoose');

const MeseConsuntivoSchema = mongoose.Schema({
	_id: {
		type: String,
		required: true
	},
	id_cliente: {
		type: String,
		required: true
	},
	user: {
		type: String,
		required: true
	},
	anno_consuntivo: {
		type: Number,
		required: true
	},
	mese_consuntivo: {
		type: Number,
		required: true
	},
});


MeseConsuntivoSchema.methods.findByClienteAnnoAndMese = function findByClienteAnnoAndMese(params, callback) {
	return this.model('MeseConsuntivo').find().
		where('anno_consuntivo').equals(params.anno).
		where('mese_consuntivo').equals(params.mese).
		where('id_cliente').equals(params.idCliente).
		exec(callback);
}

const MeseConsuntivo = module.exports = mongoose.model('MeseConsuntivo', MeseConsuntivoSchema); 
