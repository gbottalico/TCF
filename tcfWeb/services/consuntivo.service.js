var config = require('config.json');
var _ = require('lodash');
var Q = require('q');
var dateFormat = require('dateformat');


var serviceConsuntivo = {};

const MeseConsuntivo = require('../models/meseConsuntivo.js');
const Consuntivo = require('../models/consuntivo.js');


//serviceConsuntivo.addMeseConsuntivo = addMeseConsuntivo;
serviceConsuntivo.getMeseConsuntivoCliente = getMeseConsuntivoCliente;
serviceConsuntivo.addConsuntivo = addConsuntivo;
serviceConsuntivo.getConsuntivoCliente = getConsuntivoCliente;
serviceConsuntivo.getConsuntiviBetweenDates = getConsuntiviBetweenDates;
serviceConsuntivo.getConsuntiviUtente = getConsuntiviUtente;
serviceConsuntivo.addConsuntiviUtente = addConsuntiviUtente;

module.exports = serviceConsuntivo;
/*
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
}*/

//OK
function addConsuntivo(consuntivoParam) {
    console.log("addConsuntivo " + consuntivoParam._id)
    var deferred = Q.defer();
    consuntivoParam.data_consuntivo = consuntivoParam.data_consuntivo
    console.log(consuntivoParam.data_consuntivo);
    console.log(consuntivoParam);
    let newConsuntivo = new Consuntivo(consuntivoParam);
    console.log(newConsuntivo);
    var query = { '_id': newConsuntivo._id };
    Consuntivo.findOneAndUpdate(query, newConsuntivo, { upsert: true }, function (err, doc) {
        if (err) {
            deferred.reject(err.name + ': ' + err.message);
        } else {
            deferred.resolve({ msg: 'Consuntivo add successfully' });
        }
    });
    return deferred.promise;
}

function getMeseConsuntivoCliente(idCliente, anno, mese) {
    var deferred = Q.defer();
    console.log(idCliente + "-" + anno + "-" + mese);
    let meseConsuntivo = new MeseConsuntivo();
    meseConsuntivo.findByClienteAnnoAndMese({ idCliente: idCliente, anno: anno, mese: mese }, function (err, consuntivo) {
        if (err) {
            deferred.reject(err.name + ': ' + err.message);
        } else {
            deferred.resolve(consuntivo);
        }

    });

    return deferred.promise;
}


function getConsuntivoCliente(idCliente, data) {
    var deferred = Q.defer();

    let consuntivo = new Consuntivo();
    data = dateFormat(new Date(data), "yyyy-dd-mm");
    consuntivo.findByClienteAndData({ idCliente: idCliente, data: new Date(data).toISOString() }, function (err, consuntivo) {
        if (err) {
            deferred.reject(err.name + ': ' + err.message);
        } else {
            deferred.resolve(consuntivo);
        }

    });

    return deferred.promise;
}

function getConsuntiviBetweenDates(start, end) {
    var deferred = Q.defer();

    start = dateFormat(new Date(start), "yyyy-dd-mm");
    end = dateFormat(new Date(end), "yyyy-dd-mm");
    console.log("Dal: " + new Date(start).toISOString() + "Al: " + new Date(end).toISOString());
    let consuntivo = new Consuntivo();
    consuntivo.findBetweenDates({ start: new Date(start).toISOString(), end: new Date(end).toISOString() }, function (err, consuntivo) {
        if (err) {
            deferred.reject(err.name + ': ' + err.message);
        } else {
            deferred.resolve(consuntivo);
        }

    });

    return deferred.promise;
}


function getConsuntiviUtente(id_user, month, year) {
    var deferred = Q.defer();


    let consuntivo = new Consuntivo();
    consuntivo.getConsuntiviUtente({ start: new Date(start).toISOString(), end: new Date(end).toISOString() }, function (err, consuntivo) {
        if (err) {
            deferred.reject(err.name + ': ' + err.message);
        } else {
            deferred.resolve(consuntivo);
        }

    });

    return deferred.promise;
}

//OK
function getConsuntiviUtente(id_user, month, year) {
    var deferred = Q.defer();
    console.log("user: " + id_user + " month: " + month + "/" + year);
    let consuntivo = new Consuntivo();
    consuntivo.getConsuntiviUtente({ id_user: id_user, month: month, year: year}, function (err, consuntiviUtente) {
        if (err) {
            deferred.reject(err.name + ': ' + err.message);
        } else {            
            deferred.resolve(consuntiviUtente);
        }

    });

    return deferred.promise;
}

//OK
function addConsuntiviUtente(consuntiviUtente) {
    var deferred = Q.defer();
    console.log("addConsuntivi");
    let consuntivo = new Consuntivo();
    consuntivo.addConsuntiviUtente(consuntiviUtente, function (err, doc) {
        if (err) {
            deferred.reject(err.name + ': ' + err.message);
        } else {            
            deferred.resolve({msg: 'ConsuntiviUtente add successfully'});
        }

    });

    return deferred.promise;
}

