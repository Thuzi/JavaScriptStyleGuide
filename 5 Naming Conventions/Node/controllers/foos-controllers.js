
//
// dependencies
//

var Foo = require('../models/foo').Foo;

//
// foos controller
//

var FoosControlller = function () {

//
// actions
//

    this.index = function (req, res, next) {
        Foo.findForList(function (err, docs) {
            if (err) return next(err);

            res.json(docs);
        });
    },

    this.show = function (req, res, next) {
        Foo.findOne(function (err, docs) {
            if (err) return next(err);

            res.json(docs);
        });
    }
};

exports.FoosControlller = FoosControlller;
