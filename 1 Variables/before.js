
 var Step 		= require('step');
var mongoose 	= require('mongoose');
var ObjectId 	= mongoose.Types.ObjectId;
var Event 		= mongoose.model('Event');
var Like 		= mongoose.model('Like');
var User 		= mongoose.model('User');
var TwitterAuthToken = mongoose.model('TwitterAuthToken');
var Photo 		= mongoose.model('Photo');
var Score 		= mongoose.model('Score');
var RayRay		= mongoose.model('RayRay');
var restler 	= require('restler');
var FB 			= require('../libs/fb-node')(require('fb'));
var moment    	= require('moment');
var request     = require('request');
var qs          = require('querystring');

module.exports = function(app) {

    app.get('/', function (req, res, next) {
    	
    	var fbLogin = new {username: "larry.hipp", firstName: "Larry", lastName: "Hipp"};
    }
}