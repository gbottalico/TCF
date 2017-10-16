const express = require('express');
const routerUser = express.Router();
var userService = require('../services/user.service');


routerUser.post('/authenticate', authenticate);

routerUser.post('/userChangeEmail', changeUserEmail);
routerUser.post('/userChangePwd', changeUserPwd);
routerUser.get('/users', getUsers);
routerUser.get('/user/:id', getUser);
routerUser.post('/user', InsOrUpdUser);
routerUser.delete('/user/:id', delUser);

//SECURITY SECTION - START
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

function changeUserEmail(req, res) {
	console.log("user.controller.changeUserEmail");
	
	userService.changeUserEmail(req.body.username, req.body.newEmail)
		.then(function(msg){

			console.log("user.controller.changeUserEmail: ok");
            res.send(msg);
		}).catch(function (err) {
			console.log("user.controller.changeUserEmail: fail");
		   	res.status(400).send(err);
		});
	
}

function changeUserPwd(req, res) {
    userService.changeUserPwd(req.body.userLogged, req.body.oldPwd, req.body.newPwd)
		.then(function(msg){
			console.log("user.controller.changeUserPwd: ok");
			res.send(msg);
		}).catch(function (err) {
			console.log("user.controller.changeUserPwd: fail");
			res.status(400).send(err);
		});
};
//SECURITY SECTION - END


//CRUD - CREATE
function InsOrUpdUser(req, res){
	userService.insOrUpdUser(req.body).then(function(){
		 res.sendStatus(200);
	}).catch(function (err) {
            res.status(400).send(err);
        });
	
};

//CRUD - READ multiple
function getUsers(req, res){
	userService.getAll().then(function(users){		 
		 res.send(users);
	}).catch(function (err) {
            res.status(400).send(err);
        });
	
};

//CRUD - READ
function getUser(req, res){
	userService.getById(req.params.id).then(function(user){		 
		console.log(user);
		res.send(user);
   }).catch(function (err) {
		   res.status(400).send(err);
	   });	
};

//CRUD - DELETE
function delUser(req, res){
	userService.delUser(req.params.id).then(function(result){		 
		console.log(result);
		res.send(result);
   }).catch(function (err) {
		   res.status(400).send(err);
	   });	
};

module.exports = routerUser;
