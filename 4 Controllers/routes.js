//
// routes
//	it's like routes.rb or something like that
//

/* 

ref: http://guides.rubyonrails.org/routing.html
creates seven different routes in your application, all mapping to the Photos controller:

+===========================================================================================+
| HTTP Verb	| Path				| action 	| used for 										|
+===========================================================================================+
| GET		| /photos			| index		| display a list of all photos 					|
| GET		| /photos/new		| new		| return an HTML form for creating a new photo 	|
| POST		| /photos			| create	| create a new photo 							|
| GET		| /photos/:id		| show		| display a specific photo 						|
| GET		| /photos/:id/edit	| edit		| return an HTML form for editing a photo 		|
| PUT		| /photos/:id		| update	| update a specific photo 						|
| DELETE	| /photos/:id		| destroy	| delete a specific photo 						|
+===========================================================================================+

*/

var	AfterControlller	= require('./controllers/after-controller').AfterControlller;
    
var routes = (function () {
	var	afterControlller	= new AfterControlller();

	function load (app) {

		// accounts
		app.get('/afters', 		app.auth,	afterControlller.index);
		app.post('/afters', 	app.auth,	afterControlller.create);
		app.put('/afters/:id', 	app.auth,	afterControlller.update);
		app.del('/afters/:id', 	app.auth,	afterControlller.destroy);
	}
	
	return {
		load: load
	}
})();

exports.routes = routes;