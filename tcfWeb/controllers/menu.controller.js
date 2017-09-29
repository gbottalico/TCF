const express = require('express');
const routerMenu = express.Router();
var menuService = require('../services/menu.service');


routerMenu.post('/getMenuList', getMenu);
routerMenu.post('/addMenu', addMenu);


//add menu
function addMenu(req, res){
	menuService.addMenu(req.body).then(function(){
        console.log('prova');
        console.log(req.body);
		 res.sendStatus(200);
	}).catch(function (err) {
            res.status(400).send(err);
        });
	
};

//getmenulist
function getMenu(req, res){
	menuService.getAll().then(function(menuList){		 
        res.send(menuList);         
	}).catch(function (err) {
       console.log(err);
       res.status(400).send(err);
        });
	
};


module.exports = routerMenu;
