const express = require('express');
const router = express.Router();
var userService = require('services/user.service');


router.post('/authenticate', authenticate);
router.post('/user', addUser);
router.get('/users', getAll);
router.post('/sede', addSede);
router.get('/sedi', getSedi);
router.post('/cliente', addCliente);
router.get('/clienti', getClienti);
router.post('/profilo', addProfilo);
router.get('/profili', getProfili);
router.post('/commessa', addCommessa);
router.get('/commesse', getCommesse);
router.post('/macroArea', addMacroArea);
router.get('/macroAree', getMacroAree);
router.get('/commesseFincons', getCommessFincons);
router.post('/ambito', addAmbito);
router.get('/ambiti', getAmbiti);
router.get('/ambiti/:idCliente', getAmbitiCliente);
router.post('/addAttivita', addAttivita);
router.get('/attivita', getAttivita);
router.get('/attivita/:idCliente/:idAmbito', getAttivitaByClienteAndAmbito);
router.post('/addStatoAttivita', addStatoAttivita);
router.get('/statoAttivita', getStatoAttivita);
router.post('/addTipoDeliverable', addTipoDeliverable);
router.get('/tipiDeliverable', getTipiDeliverable);

function authenticate(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function (user) {
            if (user) {
                // authentication successful
                res.send(user);
            } else {
                // authentication failed
                res.status(400).send('Username or password is incorrect');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

//add user
function addUser(req, res){
	userService.addUser(req.body).then(function(){
		 res.sendStatus(200);
	}).catch(function (err) {
            res.status(400).send(err);
        });
	
};

function getAll(req, res){
	userService.getAll().then(function(users){
		 res.send(users);
	}).catch(function (err) {
            res.status(400).send(err);
        });
	
};

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
	userService.getMacroaree().then(function(macroaree){
		 res.send(macroaree);
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

function getAttivitaByClienteAndAmbito(req, res){
	userService.getAttivita(req.body.idCliente, req.body.idAmbito).then(function(attivita){
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

function getStatoAttivita(req, res){
	userService.getStatoAttivita().then(function(statoAttivita){
		 res.send(statoAttivita);
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

/*
//retrieving users
router.get('/users', (req, res, next)=>{
	User.(findfunction(err, users){
		res.json(users);
	});
});

//add user
router.post('/user', (req, res, next)=>{
	let newUser = new User({
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		mail: req.body.mail
	});
	newUser.save((err, user)=>{
		if (err){
			res.json({msg: 'Failed to add User : '+err});	
		}else{
			res.json({msg: 'User add successfully'})
		}
		
	});
});

//delete user
router.delete('/user/:id', (req, res, next)=>{
	User.remove({_id: req.params.id}, (err, result)=>{
		if (err){
			res.json(err);	
		}else{
			res.json(result)
		}
	})
})
*/
module.exports = router;
