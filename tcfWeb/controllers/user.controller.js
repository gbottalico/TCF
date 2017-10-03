const express = require('express');
const routerUser = express.Router();
var userService = require('services/user.service');


routerUser.post('/authenticate', authenticate);
routerUser.post('/user', addUser);
routerUser.post('/userChangeEmail', changeUserEmail);
routerUser.post('/userChangePwd', changeUserPwd);
routerUser.get('/users', getAll);


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
            res.sendStatus(200).send(msg);
		}).catch(function (err) {
			console.log("user.controller.changeUserEmail: fail");
		   	res.status(400).send(err);
		});
	
}

function changeUserPwd(req, res) {
    userService.changeUserPwd(req.body.username, req.body.oldPwd, req.body.newPwd)
		.then(function(msg){
			console.log("user.controller.changeUserPwd: ok");
			res.sendStatus(200).send(msg);
		}).catch(function (err) {
			console.log("user.controller.changeUserPwd: fail");
			res.status(400).send(err);
		});
};

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


/*
//retrieving users
routerUser.get('/users', (req, res, next)=>{
	User.(findfunction(err, users){
		res.json(users);
	});
});

//add user
routerUser.post('/user', (req, res, next)=>{
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
routerUser.delete('/user/:id', (req, res, next)=>{
	User.remove({_id: req.params.id}, (err, result)=>{
		if (err){
			res.json(err);	
		}else{
			res.json(result)
		}
	})
})
*/
module.exports = routerUser;
