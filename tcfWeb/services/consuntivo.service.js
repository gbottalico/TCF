var config = require('config.json');
var _ = require('lodash');
var Q = require('q');
var dateFormat = require('dateformat');

var serviceConsuntivo = {};

const MeseConsuntivo = require('../models/meseConsuntivo.js');
const Consuntivo = require('../models/consuntivo.js');

serviceConsuntivo.addMeseConsuntivo = addMeseConsuntivo;
serviceConsuntivo.getMeseConsuntivoCliente = getMeseConsuntivoCliente;
serviceConsuntivo.addConsuntivo = addConsuntivo;
serviceConsuntivo.getConsuntivoCliente = getConsuntivoCliente;
serviceConsuntivo.getConsuntiviBetweenDates = getConsuntiviBetweenDates;

module.exports = serviceConsuntivo;

function addMeseConsuntivo(meseConsuntivoParam) {
    console.log("addMeseConsuntivo "+meseConsuntivoParam._id)
    var deferred = Q.defer();
    console.log (meseConsuntivoParam);
    let newMeseConsuntivo = new MeseConsuntivo(meseConsuntivoParam);
    console.log(newMeseConsuntivo);
    var query = {'_id':newMeseConsuntivo._id};
    MeseConsuntivo.findOneAndUpdate(query, newMeseConsuntivo, {upsert:true}, function(err, doc){
        if (err){
            deferred.reject(err.name + ': ' + err.message);
        }else{
             deferred.resolve({msg: 'MeseConsuntivo add successfully'});
        }
    });
     return deferred.promise;
}

function addConsuntivo(consuntivoParam) {
    console.log("addConsuntivo "+consuntivoParam._id)
    var deferred = Q.defer();
	consuntivoParam.data_consuntivo = dateFormat(new Date(consuntivoParam.data_consuntivo), "yyyy-dd-mm");
	console.log(consuntivoParam.data_consuntivo);
    console.log (consuntivoParam);
    let newConsuntivo = new Consuntivo(consuntivoParam);
    console.log(newConsuntivo);
    var query = {'_id':newConsuntivo._id};
    Consuntivo.findOneAndUpdate(query, newConsuntivo, {upsert:true}, function(err, doc){
        if (err){
            deferred.reject(err.name + ': ' + err.message);
        }else{
             deferred.resolve({msg: 'Consuntivo add successfully'});
        }
    });
     return deferred.promise;
}

function getMeseConsuntivoCliente(idCliente, anno, mese) {
    var deferred = Q.defer();

	let meseConsuntivo = new MeseConsuntivo();
    meseConsuntivo.findByClienteAnnoAndMese({idCliente : idCliente, anno: anno, mese : mese},function (err, consuntivo) {
        if (err){
          deferred.reject(err.name + ': ' + err.message);  
      } else{
        deferred.resolve(consuntivo);
      }

    });

    return deferred.promise;
}

function getConsuntivoCliente(idCliente, data) {
    var deferred = Q.defer();

	let consuntivo = new Consuntivo();
	data = dateFormat(new Date(data), "yyyy-dd-mm");
    consuntivo.findByClienteAndData({idCliente : idCliente, data : new Date(data).toISOString()},function (err, consuntivo) {
        if (err){
          deferred.reject(err.name + ': ' + err.message);  
      } else{
        deferred.resolve(consuntivo);
      }

    });

    return deferred.promise;
}

function getConsuntiviBetweenDates(start, end) {
    var deferred = Q.defer();

	start = dateFormat(new Date(start), "yyyy-dd-mm");
	end = dateFormat(new Date(end), "yyyy-dd-mm");
	console.log("Dal: " + new Date(start).toISOString() + "Al: "+ new Date(end).toISOString());
	let consuntivo = new Consuntivo();
    consuntivo.findBetweenDates({start : new Date(start).toISOString(), end : new Date(end).toISOString()},function (err, consuntivo) {
        if (err){
          deferred.reject(err.name + ': ' + err.message);  
      } else{
        deferred.resolve(consuntivo);
      }

    });

    return deferred.promise;
}