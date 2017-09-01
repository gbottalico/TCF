var config = require('config.json');
var _ = require('lodash');
var Q = require('q');
var dateFormat = require('dateformat');
var excelbuilder = require('msexcel-builder');

var serviceReportistica = {};

const Consuntivo = require('../models/consuntivo.js');

serviceReportistica.getReportistica = getReportistica;

module.exports = serviceReportistica;

function getReportistica(reportisticaParam){
	var deferred = Q.defer();

	var workbook = excelbuilder.createWorkbook("C:/Users/luca.massa/Desktop/file.xlsx")

	// Create a new worksheet with 10 columns and 12 rows 
	var sheet1 = workbook.createSheet('sheet1', 10, 12);

	// Fill some data 
	sheet1.set(1, 1, 'I am title');
	for (var i = 2; i < 5; i++)
	  sheet1.set(i, 1, 'test'+i);

	// Save it 
	workbook.save(function(ok){
	  if (!ok) 
		  deferred.reject({msg: 'Error. XLS doesn\'t created'});
	  else
		deferred.resolve({msg: 'XLS created successfully'});
	});
	return deferred.promise;
}