var config = require('config.json');
var _ = require('lodash');
var Q = require('q');


var serviceConsuntivo = {};

const MeseConsuntivo = require('../models/meseConsuntivo.js');
const Consuntivo = require('../models/consuntivo.js');

serviceConsuntivo.addMeseConsuntivo = addMeseConsuntivo;
serviceConsuntivo.getMeseConsuntivoCliente = getMeseConsuntivoCliente;
serviceConsuntivo.addConsuntivo = addConsuntivo;
serviceConsuntivo.getConsuntivoCliente = getConsuntivoCliente;

module.exports = serviceConsuntivo;

function addMeseConsuntivo(meseConsuntivoParam) {
    console.log("addMeseConsuntivo "+meseConsuntivoParam._id)
    var deferred = Q.defer();
    meseConsuntivoParam.data_inizio_validita = Date.now();
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
    consuntivoParam.data_inizio_validita = Date.now();
    console.log (consuntivoParam);
    let newConsuntivo = new Consuntivo(consuntivoParam);
    console.log(newConsuntivo);
    Consuntivo.findOneAndUpdate({}, newConsuntivo, {upsert:true}, function(err, doc){
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

function getConsuntivoCliente(idCliente, anno, mese) {
    var deferred = Q.defer();

	let consuntivo = new Consuntivo();
    consuntivo.findByClienteAnnoAndMese({idCliente : idCliente, anno: anno, mese : mese},function (err, consuntivo) {
        if (err){
          deferred.reject(err.name + ': ' + err.message);  
      } else{
        deferred.resolve(consuntivo);
      }

    });

    return deferred.promise;
}