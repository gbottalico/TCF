var config = require('config.json');
var _ = require('lodash');
var Q = require('q');


var serviceDomain = {};

const Sede = require('../models/sede.js');
const Cliente = require('../models/sede.js');
const Profilo = require('../models/profile.js');
const CommessaCliente = require('../models/commessaCliente.js');
const MacroArea = require('../models/macroArea.js');
const CommessaFincons = require('../models/commessaFincons.js');
const Ambito = require('../models/ambito.js');
const Attivita = require('../models/attivita.js');
const StatoAttivita = require('../models/statoAttivita.js');
const TipoDeliverable = require('../models/tipoDeliverable.js');


serviceDomain.addSede = addSede;
serviceDomain.getSedi = getSedi;
serviceDomain.addCliente = addCliente;
serviceDomain.getClienti = getClienti;
serviceDomain.addProfilo = addProfilo;
serviceDomain.getProfili = getProfili;
serviceDomain.addProfilo = addProfilo;
serviceDomain.getProfili = getProfili;
serviceDomain.addCommessa = addCommessa;
serviceDomain.getCommesse = getCommesse;
serviceDomain.getCommesseCliente = getCommesseCliente;
serviceDomain.addMacroArea = addMacroArea;
serviceDomain.getMacroAree = getMacroAree;
serviceDomain.addCommessaFincons = addCommessaFincons;
serviceDomain.getCommesseFincons = getCommesseFincons;
serviceDomain.addAmbito = addAmbito;
serviceDomain.getAmbiti = getAmbiti;
serviceDomain.getAmbitiCliente = getAmbitiCliente;
serviceDomain.addAttivita = addAttivita;
serviceDomain.getAttivita = getAttivita;
serviceDomain.getAttivitaByCommessaClienteAndAmbito = getAttivitaByCommessaClienteAndAmbito;
serviceDomain.addStatoAttivita = addStatoAttivita;
serviceDomain.getStatiAttivita = getStatiAttivita;
serviceDomain.addTipoDeliverable = addTipoDeliverable;
serviceDomain.getTipiDeliverable = getTipiDeliverable;

module.exports = serviceDomain;



function addSede(sedeParam) {
    console.log("addSede "+sedeParam._id)
    var deferred = Q.defer();
    sedeParam.data_inizio_validita = Date.now();
    console.log (sedeParam);
    let newSede = new Sede(sedeParam);
    console.log(newSede);
    var query = {'_id':newSede._id};
    Sede.findOneAndUpdate(query, newSede, {upsert:true}, function(err, doc){
        if (err){
            deferred.reject(err.name + ': ' + err.message);
        }else{
             deferred.resolve({msg: 'Sede add successfully'});
        }
    });
     return deferred.promise;
}

function getSedi() {
    var deferred = Q.defer();
	
	let sede = new Sede();
    sede.findAll({},function (err, sedi) {
        if (err){
          deferred.reject(err.name + ': ' + err.message);  
      } else{
        deferred.resolve(sedi);
      }

    });

    return deferred.promise;
}

function addCliente(clienteParam) {
    console.log("addCliente "+clienteParam._id)
    var deferred = Q.defer();
    clienteParam.data_inizio_validita = Date.now();
    console.log (clienteParam);
    let newCliente = new Cliente(clienteParam);
    console.log(newCliente);
    var query = {'_id':newCliente._id};
    Cliente.findOneAndUpdate(query, newCliente, {upsert:true}, function(err, doc){
        if (err){
            deferred.reject(err.name + ': ' + err.message);
        }else{
             deferred.resolve({msg: 'Cliente add successfully'});
        }
    });
     return deferred.promise;
}

function getClienti() {
    var deferred = Q.defer();

	let cliente = new Cliente();
    cliente.findAll({},function (err, clienti) {
        if (err){
          deferred.reject(err.name + ': ' + err.message);  
      } else{
        deferred.resolve(clienti);
      }

    });

    return deferred.promise;
}

function addProfilo(profiloParam) {
    console.log("addProfilo "+profiloParam._id)
    var deferred = Q.defer();
    profiloParam.data_inizio_validita = Date.now();
    console.log (profiloParam);
    let newProfilo = new Profilo(profiloParam);
    console.log(newProfilo);
    var query = {'_id':newProfilo._id};
    Profilo.findOneAndUpdate(query, newProfilo, {upsert:true}, function(err, doc){
        if (err){
            deferred.reject(err.name + ': ' + err.message);
        }else{
             deferred.resolve({msg: 'Profilo add successfully'});
        }
    });
     return deferred.promise;
}

function getProfili() {
    var deferred = Q.defer();

	let profilo = new Profilo();
    profilo.findAll({},function (err, profili) {
        if (err){
          deferred.reject(err.name + ': ' + err.message);  
      } else{
        deferred.resolve(profili);
      }

    });

    return deferred.promise;
}

function addCommessa(commessaParam) {
    console.log("addCommessa "+commessaParam._id)
    var deferred = Q.defer();
    commessaParam.data_inizio_validita = Date.now();
    console.log (commessaParam);
    let newCommessa = new Commessa(commessaParam);
    console.log(newCommessa);
    var query = {'_id':newCommessa._id};
    Commessa.findOneAndUpdate(query, newCommessa, {upsert:true}, function(err, doc){
        if (err){
            deferred.reject(err.name + ': ' + err.message);
        }else{
             deferred.resolve({msg: 'Commessa add successfully'});
        }
    });
     return deferred.promise;
}

function getCommesse() {
    var deferred = Q.defer();

	let commessa = new CommessaCliente();
    commessa.findAll({},function (err, commesse) {
        if (err){
          deferred.reject(err.name + ': ' + err.message);  
      } else{
        deferred.resolve(commesse);
      }

    });

    return deferred.promise;
}

function getCommesseCliente(idCliente) {
    var deferred = Q.defer();

	let commessa = new CommessaCliente();
    commessa.findByCliente({idCliente : idCliente},function (err, commesse) {
        if (err){
          deferred.reject(err.name + ': ' + err.message);  
      } else{
        deferred.resolve(commesse);
      }

    });

    return deferred.promise;
}

function addMacroArea(macroAreaParam) {
    console.log("addMacroArea "+macroAreaParam._id)
    var deferred = Q.defer();
    macroAreaParam.data_inizio_validita = Date.now();
    console.log (macroAreaParam);
    let newMacroArea = new MacroArea(macroAreaParam);
    console.log(newMacroArea);
    var query = {'_id':newMacroArea._id};
    MacroArea.findOneAndUpdate(query, newMacroArea, {upsert:true}, function(err, doc){
        if (err){
            deferred.reject(err.name + ': ' + err.message);
        }else{
             deferred.resolve({msg: 'MacroArea add successfully'});
        }
    });
     return deferred.promise;
}

function getMacroAree() {
    var deferred = Q.defer();

	let macroArea = new MacroArea();
    macroArea.findAll({},function (err, macroAree) {
        if (err){
          deferred.reject(err.name + ': ' + err.message);  
      } else{
        deferred.resolve(macroAree);
      }

    });

    return deferred.promise;
}

function addCommessaFincons(commessaFinconsParam) {
    console.log("addCommessaFincons "+commessaFinconsParam._id)
    var deferred = Q.defer();
    commessaFinconsParam.data_inizio_validita = Date.now();
    console.log (commessaFinconsParam);
    let newCommessaFincons = new CommessaFincons(commessaFinconsParam);
    console.log(newCommessaFincons);
    var query = {'_id':newCommessaFincons._id};
    CommessaFincons.findOneAndUpdate(query, newCommessaFincons, {upsert:true}, function(err, doc){
        if (err){
            deferred.reject(err.name + ': ' + err.message);
        }else{
             deferred.resolve({msg: 'CommessaFincons add successfully'});
        }
    });
     return deferred.promise;
}

function getCommesseFincons() {
    var deferred = Q.defer();

	let commessaFincons = new CommessaFincons();
    commessaFincons.findAll({},function (err, commesseFincons) {
        if (err){
          deferred.reject(err.name + ': ' + err.message);  
      } else{
        deferred.resolve(commesseFincons);
      }

    });

    return deferred.promise;
}

function addAmbito(ambitoParam) {
    console.log("addAmbito "+ambitoParam._id)
    var deferred = Q.defer();
    ambitoParam.data_inizio_validita = Date.now();
    console.log (ambitoParam);
    let newAmbito = new Ambito(ambitoParam);
    console.log(newAmbito);
    var query = {'_id':newAmbito._id};
    Ambito.findOneAndUpdate(query, newAmbito, {upsert:true}, function(err, doc){
        if (err){
            deferred.reject(err.name + ': ' + err.message);
        }else{
             deferred.resolve({msg: 'Ambito add successfully'});
        }
    });
     return deferred.promise;
}

function getAmbiti() {
    var deferred = Q.defer();

	let ambito = new Ambito();
    ambito.findAll({},function (err, ambiti) {
        if (err){
          deferred.reject(err.name + ': ' + err.message);  
      } else{
        deferred.resolve(ambiti);
      }

    });

    return deferred.promise;
}

function getAmbitiCliente(idCliente) {
    var deferred = Q.defer();

	let ambito = new Ambito();
    ambito.findByCliente({idCliente : idCliente},function (err, ambiti) {
        if (err){
          deferred.reject(err.name + ': ' + err.message);  
      } else{
        deferred.resolve(ambiti);
      }

    });

    return deferred.promise;
}

function addAttivita(attivitaParam) {
    console.log("addAttivita "+attivitaParam._id)
    var deferred = Q.defer();
    attivitaParam.data_inizio_validita = Date.now();
    console.log (attivitaParam);
    let newAttivita = new Attivita(attivitaParam);
    console.log(newAttivita);
    var query = {'_id':newAttivita._id};
    Attivita.findOneAndUpdate(query, newAttivita, {upsert:true}, function(err, doc){
        if (err){
            deferred.reject(err.name + ': ' + err.message);
        }else{
             deferred.resolve({msg: 'Attivita add successfully'});
        }
    });
     return deferred.promise;
}

function getAttivita() {
    var deferred = Q.defer();

	let attivita = new Attivita();
    attivita.findAll({},function (err, attivita) {
        if (err){
          deferred.reject(err.name + ': ' + err.message);  
      } else{
        deferred.resolve(attivita);
      }

    });

    return deferred.promise;
}

function getAttivitaByCommessaClienteAndAmbito(idCommessaCliente, idAmbito) {
    var deferred = Q.defer();

	let attivita = new Attivita();
    attivita.findByCommessaClienteAndAmbito({idCommessaCliente : idCommessaCliente, idAmbito : idAmbito},function (err, attivita) {
        if (err){
          deferred.reject(err.name + ': ' + err.message);  
      } else{
        deferred.resolve(attivita);
      }

    });

    return deferred.promise;
}

function addStatoAttivita(statoAttivitaParam) {
    console.log("addStatoAttivita "+statoAttivitaParam._id)
    var deferred = Q.defer();
    statoAttivitaParam.data_inizio_validita = Date.now();
    console.log (statoAttivitaParam);
    let newStatoAttivita = new StatoAttivita(statoAttivitaParam);
    console.log(newStatoAttivita);
    var query = {'_id':newStatoAttivita._id};
    StatoAttivita.findOneAndUpdate(query, newStatoAttivita, {upsert:true}, function(err, doc){
        if (err){
            deferred.reject(err.name + ': ' + err.message);
        }else{
             deferred.resolve({msg: 'StatoAttivita add successfully'});
        }
    });
     return deferred.promise;
}

function getStatiAttivita() {
    var deferred = Q.defer();

	let statoAttivita = new StatoAttivita();
    statoAttivita.findAll({},function (err, statiAttivita) {
        if (err){
          deferred.reject(err.name + ': ' + err.message);  
      } else{
        deferred.resolve(statiAttivita);
      }

    });

    return deferred.promise;
}

function addTipoDeliverable(tipoDeliverableParam) {
    console.log("addTipoDeliverable "+tipoDeliverableParam._id)
    var deferred = Q.defer();
    tipoDeliverableParam.data_inizio_validita = Date.now();
    console.log (tipoDeliverableParam);
    let newTipoDeliverable = new TipoDeliverable(tipoDeliverableParam);
    console.log(newTipoDeliverable);
    var query = {'_id':newTipoDeliverable._id};
    TipoDeliverable.findOneAndUpdate(query, newTipoDeliverable, {upsert:true}, function(err, doc){
        if (err){
            deferred.reject(err.name + ': ' + err.message);
        }else{
             deferred.resolve({msg: 'TipoDeliverable add successfully'});
        }
    });
     return deferred.promise;
}

function getTipiDeliverable() {
    var deferred = Q.defer();

	let tipoDeliverable = new TipoDeliverable();
    tipoDeliverable.findAll({},function (err, tipiDeliverable) {
        if (err){
          deferred.reject(err.name + ': ' + err.message);  
      } else{
        deferred.resolve(tipiDeliverable);
      }

    });

    return deferred.promise;
}
