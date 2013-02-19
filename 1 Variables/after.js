
/*

1) variable declarations
 1.1) single var declaration at top of function (scope)
 1.2) alphabetize variable declarations
 1.3) use full names, not abbreviations
 1.4) tab indent declarations for alignment
	1.4.1) convert tabs to spaces in your editor
 1.5) multiple property assignments should break across lines 

*/
var FB 					= require('../libs/fb-node')(require('fb')),
	moment    			= require('moment'),
	mongoose 			= require('mongoose'),
	qs          		= require('querystring'),
	request     		= require('request'),
	restler 			= require('restler'),	
	Step 				= require('step'),

	Event 				= mongoose.model('Event'),
	Like 				= mongoose.model('Like'),	
	ObjectId 			= mongoose.Types.ObjectId,
	Photo 				= mongoose.model('Photo'),
	RayRay				= mongoose.model('RayRay'),
	Score 				= mongoose.model('Score'),
	TwitterAuthToken 	= mongoose.model('TwitterAuthToken'),
	User 				= mongoose.model('User');

module.exports = function(app) {

    app.get('/', function (req, res, next) {
        
        var facebookLogin = new {
            username:   "larry.hipp", 
            firstName:  "Larry", 
            lastName:   "Hipp"
        };

    }
}