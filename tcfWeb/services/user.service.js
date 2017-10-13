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
serviceUser.changeUserEmail = changeUserEmail;
serviceUser.changeUserPwd = changeUserPwd;
serviceUser.getAll = getAll;
serviceUser.getUsersByClient = getUsersByClient;
serviceUser.getMaxProfile = getMaxProfile;

/*serviceUser.getById = getById;
serviceUser.create = create;
serviceUser.update = update;
serviceUser.delete = _delete;*/

module.exports = serviceUser;

function authenticate(username, password) {
    console.log("richiesto username " + username)
    var deferred = Q.defer();
    var userSelected = {};
    User.findById(username, (err, user) => {
        if (err) {
            deferred.reject(err.name + ': ' + err.message);
        } else {
            if (user && bcrypt.compareSync(password, user.password)) {
                //aggiungo il token
                userSelected = JSON.parse(JSON.stringify(user));
                userSelected.token = jwt.sign({ sub: userSelected._id }, config.secret);
                console.log(userSelected);
                deferred.resolve(userSelected)
            } else {
                deferred.resolve();
            }
        }
    });

    return deferred.promise;
}

function addUser(userParam) {
    console.log("addUser " + userParam._id)
    var deferred = Q.defer();
    // set user object to userParam without the cleartext password
    var user = _.omit(userParam, 'password');
    console.log(user);
    // add hashed password to user object
    user.password = bcrypt.hashSync(userParam.password, 10);

    let newUser = new User(user);
    console.log(newUser);
    var query = { '_id': newUser._id };
    User.findOneAndUpdate(query, newUser, { upsert: true }, function (err, doc) {
        if (err) {
            deferred.reject(err.name + ': ' + err.message);
        } else {
            deferred.resolve({ msg: 'User add successfully' });
        }
    });
    return deferred.promise;
}


function getAll() {
    var deferred = Q.defer();

    User.find({}, function (err, users) {
        if (err) {
            deferred.reject(err.name + ': ' + err.message);
        } else {
            deferred.resolve(users);
        }
    });
    return deferred.promise;
}

function getMaxProfile(userLogged){
    var deferred = Q.defer();    
    var logPrefix = 'user.service.getMaxProfile: ';
    let utente = new User();
    utente.getMaxProfile({ idUser : userLogged}, (err, profili) => {
        if (err) {
            deferred.reject(err.name + ': ' + err.message);
        }
        else {
            console.log(logPrefix + "Profili trovati per "+userLogged+": ["+profili[0].profilo+"]");
            deferred.resolve(profili);
        }
    });
    return deferred.promise;
}

function getUsersByClient(userLogged) {
    var logPrefix = 'user.service.getUsersByClient: ';
    var deferred = Q.defer();
    let utente = new User();
    var clienti = [];

    utente.getUsersByClient({ idUser : userLogged}, (err, clienti) => {
        if (err) {
            deferred.reject(err.name + ': ' + err.message);
        }
        else {
            if(clienti[0] != null)
                User.find({"_id":{$ne : userLogged}, "clienti": {"$elemMatch":{"id_cliente":{"$in": clienti[0].clienti}}} }, 
                    function(err, users){
                        if(err)
                            deferred.reject(err.name + ': ' + err.message);
                        else
                            deferred.resolve(users);
                    });
        }
    });
    return deferred.promise;
}

function changeUserEmail(username, newEmail) {
    var logPrefix = 'user.service.changeUserEmail: ';

    console.log(logPrefix + "richiesto cambio email username " + username + ", newEmail:" + newEmail);

    var deferred = Q.defer();
    User.findById(username, (err, user) => {
        if (err) {
            console.log(logPrefix + "error findById");
            deferred.reject(err.name + ': ' + err.message);
        } else {
            if (user) {
                console.log(logPrefix + "user found");
                user.email = newEmail;
                user.save(function (err) {
                    if (err) {
                        console.log(logPrefix + "user update email fail");
                        deferred.reject(err.name + ': ' + err.message);
                    } else {
                        console.log(logPrefix + "user update email ok");
                        deferred.resolve({ msg: 'User email changed successfully' });
                    }
                });
            } else {
                console.log(logPrefix + "user not found");
                deferred.reject("user not found");
            }
        }
    });

    return deferred.promise;
}

function changeUserPwd(userLogged, oldPwd, newPwd) {

    var logPrefix = 'user.service.changeUserPwd: ';
    console.log(logPrefix + "richiesto cambio pwd username " + userLogged._id);

    var deferred = Q.defer();
    User.findById(userLogged._id, (err, user) => {
        if (err) {
            console.log(logPrefix + "error findById");
            deferred.reject(err.name + ': ' + err.message);
        } else {
            if (user) {
                if (bcrypt.compareSync(oldPwd, user.password)) {
                    user.password = bcrypt.hashSync(newPwd, 10);
                    user.save(function (err) {
                        if (err) {
                            console.log(logPrefix + "user update pwd fail");
                            deferred.reject(err.name + ': ' + err.message);
                        } else {
                            console.log(logPrefix + "user update pwd ok");
                            deferred.resolve({ msg: 'User password changed successfully' });
                        }
                    });
                } else {
                    console.log(logPrefix + "oldPwd not correct");
                    deferred.reject("oldPwd not correct");
                }
            } else {
                console.log(logPrefix + "user not found");
                deferred.reject("user not found");
            }
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