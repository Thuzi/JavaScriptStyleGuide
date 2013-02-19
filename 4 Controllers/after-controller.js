
//
// dependencies
//

var Event = require('../models/event').Event;

//
// events controller
//

var AfterControlller = function () {

//
// actions
//

	this.index = function (req, res, next) {
		Event.findForList(function (err, docs) {
			if (err) return next(err);

			res.json(docs);
		});
	},

	this.show = function (req, res, next) {
		Event.findOne(function (err, docs) {
			if (err) return next(err);

			res.json(docs);
		});
	}
};

exports.AfterControlller = AfterControlller;
