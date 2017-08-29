var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');


var service = {};

const User = require('../models/user.js');
const Sede = require('../models/sede.js');

service.authenticate = authenticate;
service.addUser = addUser;
service.getAll = getAll;
service.addSede = addSede;
service.getSedi = getSedi;
service.addProfilo = addProfilo;
service.getProfili = getProfili;
service.addProfilo = addProfilo;
service.getProfili = getProfili;
service.addCommessa = addCommessa;
service.getCommesse = getCommesse;
service.getCommesseCliente = getCommesseCliente;
service.addMacroArea = addMacroArea;
service.getMacroAree = getMacroAree;
service.addCommessaFincons = addCommessaFincons;
service.getCommesseFincons = getCommesseFincons;
service.addAmbito = addAmbito;
service.getAmbiti = getAmbiti;
service.getAmbitiCliente = getAmbitiCliente;
service.addAttivita = addAttivita;
service.getAttivita = getAttivita;
service.getAttivitaByCommessaClienteAndAmbito = getAttivitaByCommessaClienteAndAmbito;
service.addStatoAttivita = addStatoAttivita;
service.getAttivita = getAttivita;
service.addTipoDeliverable = addTipoDeliverable;
service.getTipiDeliverable = getTipiDeliverable;
/*service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;*/

module.exports = service;

function authenticate(username, password) {
    console.log("richiesto username "+username)
    var deferred = Q.defer();
    var userSelected = {};
    User.findById(username,(err, user)=>{
        if (err){
            deferred.reject(err.name + ': ' + err.message);   
        }else{
            if (user && bcrypt.compareSync(password, user.password)){
                //aggiungo il token
                userSelected = JSON.parse(JSON.stringify(user));
                userSelected.token = jwt.sign({ sub: userSelected._id }, config.secret);
                console.log (userSelected);
                deferred.resolve(userSelected)
            }else{
                deferred.resolve();
            }
        }
    });
   
    return deferred.promise;
}

function addUser(userParam) {
    console.log("addUser "+userParam._id)
    var deferred = Q.defer();
    // set user object to userParam without the cleartext password
    var user = _.omit(userParam, 'password');
    console.log (user);
    // add hashed password to user object
    user.password = bcrypt.hashSync(userParam.password, 10);

    let newUser = new User(user);
    console.log(newUser);
    var query = {'_id':newUser._id};
    User.findOneAndUpdate(query, newUser, {upsert:true}, function(err, doc){
        if (err){
            deferred.reject(err.name + ': ' + err.message);
        }else{
             deferred.resolve({msg: 'User add successfully'});
        }
    });
     return deferred.promise;
}


function getAll() {
    var deferred = Q.defer();

    User.find({},function (err, users) {
        if (err){
          deferred.reject(err.name + ': ' + err.message);  
      } else{
        deferred.resolve(users);
      }

    });

    return deferred.promise;
}


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
	
	var sede = new Sede();
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

    Cliente.findAll({},function (err, clienti) {
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

    Profilo.findAll({},function (err, profili) {
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

    Commessa.findAll({},function (err, commesse) {
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

    Commessa.findByCliente({idCliente : idCliente},function (err, commesse) {
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

    MacroArea.findAll({},function (err, macroAree) {
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

    CommessaFincons.findAll({},function (err, commesseFincons) {
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

    Ambito.findAll({},function (err, ambiti) {
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

    Ambito.findByCliente({idCliente : idCliente},function (err, ambiti) {
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

    Attivita.findAll({},function (err, attivita) {
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

    Attivita.findByCommessaClienteAndAmbito({idCommessaCliente : idCommessaCliente, idAmbito : idAmbito},function (err, attivita) {
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

    StatoAttivita.findAll({},function (err, statiAttivita) {
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

    TipoDeliverable.findAll({},function (err, tipiDeliverable) {
        if (err){
          deferred.reject(err.name + ': ' + err.message);  
      } else{
        deferred.resolve(tipiDeliverable);
      }

    });

    return deferred.promise;
}
/*
function getById(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);

        db.users.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.username !== userParam.username) {
            // username has changed so check if the new username is already taken
            db.users.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            firstName: userParam.firstName,
            lastName: userParam.lastName,
            username: userParam.username,
        };

        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }

        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.users.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}
*/