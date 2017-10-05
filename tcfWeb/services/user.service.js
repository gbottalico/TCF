var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');


var serviceUser = {};

const User = require('../models/user.js');
const Profilo = require('../models/profile.js');
const Cliente = require('../models/cliente.js');
const UserCliente = require('../models/userCliente.js');

serviceUser.authenticate = authenticate;
serviceUser.addUser = addUser;
serviceUser.getAll = getAll;
//serviceUser.getAllByUser = getAllByUser;

/*serviceUser.getById = getById;
serviceUser.create = create;
serviceUser.update = update;
serviceUser.delete = _delete;*/

module.exports = serviceUser;

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

/*
    userlogged = user.findbyid(username)
    for cliente = userlogged.cliente
        profilo =  profile.findbyid(cliente.id_profilo)
        if(userlogged.isadmin OR profilo = 'AS')
            //vedo tutti
            for cliente.id_cliente

            end for
        else   
            //vedo solo mio
    end for    
    */ 

/*function getAllByUser(userParam){
    var userlogged = {};
    var profilo = {};
    var cliente = {};
    var userCliente = {};
    userlogged = User.findById(userParam._id, (err, user) =>{
        if (err){
            deferred.reject(err.name + ': ' + err.message);   
        }else{
            for (let i = 0; i < userlogged.cliente; i++){ 
                cliente = userlogged.cliente;
                profilo = Profilo.findById(cliente.id_profilo, (err, user) =>{
                    if (err){
                        deferred.reject(err.name + ': ' + err.message);   
                    }else{    
                        if(userlogged.isAdmin || profilo == 'AS'){
                            userCliente = UserCliente.find(userCliente => userCliente.id_cliente == cliente._id, (err, userCliente) =>{
                                if (err){
                                    deferred.reject(err.name + ': ' + err.message);   
                                }else{ 
                                    userCliente = UserCliente.find(userCliente => userCliente.id_profilo == profilo._id, (err, userCliente) =>{
                                        if (err){
                                            deferred.reject(err.name + ': ' + err.message);   
                                        }else{
                                        }
                                    });
                                }
                            });
                            //deferred.resolve(user);

                        }else{
                            // vedo solo me stesso    
                        }
                    }
                });
            }
        }
    });
}*/
    
    



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