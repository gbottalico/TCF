var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');


var service = {};

const User = require('../models/user.js');

service.authenticate = authenticate;
service.addUser = addUser;
service.getAll = getAll;
service.addSede = addSede;
service.addCliente = addCliente;
service.addProfilo = addProfilo;
service.addCommessa = addCommessa;
service.addMacroArea = addMacroArea;
service.addAmbito = addAmbito;
service.addAttivita = addAttivita;
service.addStatoAttivita = addStatoAttivita;
service.addTipoDeliverable = addTipoDeliverable;
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

function getSedi() { //da verificare
    var deferred = Q.defer();

    Sede.find(Date.now},function (err, users) {
        if (err){
          deferred.reject(err.name + ': ' + err.message);  
      } else{
        deferred.resolve(users);
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