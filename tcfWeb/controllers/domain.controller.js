const express = require('express');
const routerDomain = express.Router();
var userService = require('services/domain.service');



routerDomain.post('/sede', addSede);
routerDomain.get('/sedi', getSedi);
routerDomain.post('/cliente', addCliente);
routerDomain.get('/clienti', getClienti);
routerDomain.post('/profilo', addProfilo);
routerDomain.get('/profili', getProfili);
routerDomain.post('/commessa', addCommessa);
routerDomain.get('/commesse', getCommesse);
routerDomain.get('/commesse/:idCliente', getCommesseCliente);
routerDomain.post('/macroArea', addMacroArea);
routerDomain.get('/macroAree', getMacroAree);
routerDomain.post('/commessaFincons', addCommessaFincons);
routerDomain.get('/commesseFincons', getCommesseFincons);
routerDomain.post('/ambito', addAmbito);
routerDomain.get('/ambiti', getAmbiti);
routerDomain.get('/ambiti/:idCliente', getAmbitiCliente);
routerDomain.post('/addAttivita', addAttivita);
routerDomain.get('/attivita', getAttivita);
routerDomain.get('/attivita/:idCommessaCliente/:idAmbito', getAttivitaByCommessaClienteAndAmbito);
routerDomain.post('/addStatoAttivita', addStatoAttivita);
routerDomain.get('/statiAttivita', getStatiAttivita);
routerDomain.post('/addTipoDeliverable', addTipoDeliverable);
routerDomain.get('/tipiDeliverable', getTipiDeliverable);



function addSede(req, res){
	userService.addSede(req.body).then(function(){
		 res.sendStatus(200);
	}).catch(function (err) {
            res.status(400).send(err);
        });
	
};

function getSedi(req, res){
	userService.getSedi().then(function(sedi){
		 res.send(sedi);
	}).catch(function (err) {
            res.status(400).send(err);
    });
	
};


function addCliente(req, res){
	userService.addCliente(req.body).then(function(){
		 res.sendStatus(200);
	}).catch(function (err) {
            res.status(400).send(err);
        });
	
};

function getClienti(req, res){
	userService.getClienti().then(function(clienti){
		 res.send(clienti);
	}).catch(function (err) {
            res.status(400).send(err);
    });
	
};

function addProfilo(req, res){
	userService.addProfilo(req.body).then(function(){
		 res.sendStatus(200);
	}).catch(function (err) {
            res.status(400).send(err);
        });
	
};

function getProfili(req, res){
	userService.getProfili().then(function(profili){
		 res.send(profili);
	}).catch(function (err) {
            res.status(400).send(err);
	});
	
};


function addCommessa(req, res){
	userService.addCommessa(req.body).then(function(){
		 res.sendStatus(200);
	}).catch(function (err) {
            res.status(400).send(err);
        });
	
};

function getCommesse(req, res){
	userService.getCommesse().then(function(commesse){
		 res.send(commesse);
	}).catch(function (err) {
            res.status(400).send(err);
	});
	
};

function getCommesseCliente(req, res){
	userService.getCommesseCliente(req.body.idCliente).then(function(commesseCliente){
		 res.send(commesseCliente);
	}).catch(function (err) {
            res.status(400).send(err);
	});
	
};


function addMacroArea(req, res){
	userService.addMacroArea(req.body).then(function(){
		 res.sendStatus(200);
	}).catch(function (err) {
            res.status(400).send(err);
        });
	
};

function getMacroAree(req, res){
	userService.getMacroAree().then(function(macroaree){
		 res.send(macroaree);
	}).catch(function (err) {
            res.status(400).send(err);
	});
	
};

function addCommessaFincons(req, res){
	userService.addCommessa(req.body).then(function(){
		 res.sendStatus(200);
	}).catch(function (err) {
            res.status(400).send(err);
        });
	
};

function getCommesseFincons(req, res){
	userService.getCommesseFincons().then(function(commesseFincons){
		 res.send(commesseFincons);
	}).catch(function (err) {
            res.status(400).send(err);
	});
	
};


function addAmbito(req, res){
	userService.addAmbito(req.body).then(function(){
		 res.sendStatus(200);
	}).catch(function (err) {
            res.status(400).send(err);
        });
	
};

function getAmbiti(req, res){
	userService.getAmbiti().then(function(ambiti){
		 res.send(ambiti);
	}).catch(function (err) {
            res.status(400).send(err);
	});
	
};

function getAmbitiCliente(req, res){
	userService.getAmbitiCliente(req.body.idCliente).then(function(ambiti){
		 res.send(ambiti);
	}).catch(function (err) {
            res.status(400).send(err);
	});
	
};


function addAttivita(req, res){
	userService.addMacroAree(req.body).then(function(){
		 res.sendStatus(200);
	}).catch(function (err) {
            res.status(400).send(err);
        });
	
};

function getAttivita(req, res){
	userService.getAttivita().then(function(attivita){
		 res.send(attivita);
	}).catch(function (err) {
            res.status(400).send(err);
	});
	
};

function getAttivitaByCommessaClienteAndAmbito(req, res){
	userService.getAttivitaByCommessaClienteAndAmbito(req.body.idCommessaCliente, req.body.idAmbito).then(function(attivita){
		 res.send(attivita);
	}).catch(function (err) {
            res.status(400).send(err);
	});
	
};


function addStatoAttivita(req, res){
	userService.addStatoAttivita(req.body).then(function(){
		 res.sendStatus(200);
	}).catch(function (err) {
            res.status(400).send(err);
        });
	
};

function getStatiAttivita(req, res){
	userService.getStatiAttivita().then(function(statiAttivita){
		 res.send(statiAttivita);
	}).catch(function (err) {
            res.status(400).send(err);
	});
	
};


function addTipoDeliverable(req, res){
	userService.addTipoDeliverable(req.body).then(function(){
		 res.sendStatus(200);
	}).catch(function (err) {
            res.status(400).send(err);
        });
	
};

function getTipiDeliverable(req, res){
	userService.getTipiDeliverable().then(function(tipiDeliverable){
		 res.send(tipiDeliverable);
	}).catch(function (err) {
            res.status(400).send(err);
	});
	
};

module.exports = routerDomain;
