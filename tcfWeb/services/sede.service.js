var config = require('config.json');
var _ = require('lodash');
var Q = require('q');

var serviceSede = {};

const Sede = require('../models/sede.js');

serviceSede.addSede = addSede;
serviceSede.getSedi = getSedi;

module.exports = serviceSede;

function addSede(sedeParam) {
    console.log("addSede "+sedeParam._id)
    var deferred = Q.defer();
	if(sedeParam.data_inizio_validita == undefined){
		sedeParam.data_inizio_validita = Date.now();
	}
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