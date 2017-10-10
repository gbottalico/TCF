const express = require('express');
const routerConsuntivo = express.Router();
var consuntivoService = require('services/consuntivo.service');


//routerConsuntivo.post('/meseConsuntivo', addMeseConsuntivo);
routerConsuntivo.get('/meseConsuntivoCliente/:id_user/:month/:year', getConsuntiviUtente);
routerConsuntivo.post('/consuntivo', addConsuntivo);
routerConsuntivo.get('/consuntivoCliente/:idCliente/:data/', getConsuntiviUtente);
routerConsuntivo.post('/consuntiviTraDate', getConsuntiviBetweenDates);
routerConsuntivo.post('/modifyConsuntiviUtente', modifyConsuntiviUtente);

function addMeseConsuntivo(req, res){
	consuntivoService.addMeseConsuntivo(req.body).then(function(){
		 res.sendStatus(200);
	}).catch(function (err) {
            res.status(400).send(err);
        });
	
};

function getMeseConsuntivoUtente(req, res){
	consuntivoService.getConsuntiviUtente(req.params.idCliente, req.params.mese, req.params.anno ).then(function(consuntiviUtente){
		 res.send(consuntiviUtente);
	}).catch(function (err) {
            res.status(400).send(err);
	});
	
};

//CRUD - CREATE single
function addConsuntivo(req, res){
	consuntivoService.addConsuntivo(req.body).then(function(){
		 res.sendStatus(200);
	}).catch(function (err) {
            res.status(400).send(err);
        });
	
};

function getConsuntivoCliente(req, res){
	consuntivoService.getConsuntivoCliente(req.params.idCliente, req.params.data).then(function(consuntivo){
		 res.send(consuntivo);
	}).catch(function (err) {
            res.status(400).send(err);
	});
	
};

function getConsuntiviBetweenDates(req, res){
	consuntivoService.getConsuntiviBetweenDates(req.body.start, req.body.end).then(function(consuntivi){
		 res.send(consuntivi);
	}).catch(function (err) {
            res.status(400).send(err);
	});
	
};

//CRUD - READ multiple
function getConsuntiviUtente(req, res){
	consuntivoService.getConsuntiviUtente(req.params.id_user, req.params.month, req.params.year).then(function(consuntivi){
		 res.send(consuntivi);
	}).catch(function (err) {
            res.status(400).send(err);
	});
	
};

//CRUD - CREATE/UPDATE  multiple
function modifyConsuntiviUtente(req, res){
	consuntivoService.addConsuntiviUtente(req).then(function(msg){
		console.log("consuntivo.controller.modifyConsuntiviUtente: ok");
		res.send(msg);
	}).catch(function (err) {
            res.status(400).send(err);
	});	
};

module.exports = routerConsuntivo;
