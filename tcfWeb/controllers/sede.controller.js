const express = require('express');
const routerSede = express.Router();
var sedeService = require('../services/sede.service');



routerSede.post('/sede', addSede);
routerSede.get('/sedi', getSedi);


function addSede(req, res){
	sedeService.addSede(req.body).then(function(){
		 res.sendStatus(200);
	}).catch(function (err) {
            res.status(400).send(err);
        });
	
};

function getSedi(req, res){
	sedeService.getSedi().then(function(sedi){
		 res.send(sedi);
	}).catch(function (err) {
            res.status(400).send(err);
    });
};

module.exports = routerSede;