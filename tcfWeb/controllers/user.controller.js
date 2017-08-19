const express = require('express');
const router = express.Router();
var userService = require('services/user.service');


router.post('/authenticate', authenticate);
router.post('/user', addUser);
router.get('/users', getAll);


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
