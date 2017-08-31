const express = require('express');
const routerConsuntivo = express.Router();
var consuntivoService = require('services/consuntivo.service');


routerConsuntivo.post('/meseConsuntivo', addMeseConsuntivo);
routerConsuntivo.get('/meseConsuntivoCliente/:idCliente/:anno/:mese', getMeseConsuntivoCliente);
routerConsuntivo.post('/consuntivo', addConsuntivo);
routerConsuntivo.get('/consuntivoCliente/:idCliente/:anno/:mese/', getConsuntivoCliente);

function addMeseConsuntivo(req, res){
	consuntivoService.addMeseConsuntivo(req.body).then(function(){
		 res.sendStatus(200);
	}).catch(function (err) {
            res.status(400).send(err);
        });
	
};

function getMeseConsuntivoCliente(req, res){
	consuntivoService.getMeseConsuntivoCliente(req.params.idCliente, req.params.anno, req.params.mese).then(function(meseConsuntivo){
		 res.send(meseConsuntivo);
	}).catch(function (err) {
            res.status(400).send(err);
	});
	
};

function addConsuntivo(req, res){
	consuntivoService.addConsuntivo(req.body).then(function(){
		 res.sendStatus(200);
	}).catch(function (err) {
            res.status(400).send(err);
        });
	
};

function getConsuntivoCliente(req, res){
	consuntivoService.getConsuntivoCliente(req.params.idCliente, req.params.anno, req.params.mese).then(function(consuntivo){
		 res.send(consuntivo);
	}).catch(function (err) {
            res.status(400).send(err);
	});
	
};


module.exports = routerConsuntivo;
