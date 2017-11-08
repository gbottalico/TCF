var _ = require('lodash');
var Q = require('q');


var serviceMenu = {};

const Menu = require('../models/menu.js');

serviceMenu.addMenu = addMenu;
serviceMenu.getAll = getAll;

module.exports = serviceMenu;

function addMenu(menuParam) {
    console.log("addMenu "+menuParam._id)
    var deferred = Q.defer();
    
    let newMenu = new Menu(menuParam);

    var query = {'_id':newMenu._id};
    //Menu.findOneAndUpdate(query, {newMenu, $push: {children_menu : newMenu.children_menu}}, {upsert:true}, function(err, doc){
    Menu.findOneAndUpdate(query, menuParam, {upsert:true}, function(err, doc){
        if (err){
            deferred.reject(err.name + ': ' + err.message);
        }else{
             deferred.resolve({msg: 'Menu add successfully'});
        }
    });
     return deferred.promise;
}

function getAll() {
    console.log("getAll");
    var deferred = Q.defer();

    Menu.find({},function (err, menuEntries) {
      if (err){
        deferred.reject(err.name + ': ' + err.message);  
      } else{
        deferred.resolve(menuEntries);
      }
      console.log(menuEntries);
    });
    
    return deferred.promise;
}