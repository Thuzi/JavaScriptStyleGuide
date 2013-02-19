
var Base64      = require('../public/javascripts/_vendor/base64'),
    Event       = require('../models/event').Event,
    FB          = require('../libs/fb-node')(require('fb')),
    mongoose    = require('mongoose'),
    ObjectId    = mongoose.Types.ObjectId,
    settings    = require('../config/settings').settings,
    Step        = require('step'),
    User        = require('../models/user').User;
    
module.exports = function(app) {

    app.get('/events', function (req, res) {
        Step(
            function () {
                Event.find({enabled: true }, this);
            }, function(err, events) {
                if(err) throw err;

                res.send({ data: events.map(function (event){
                    event = event.toJSON();

                    if(event.hasOwnProperty('facebook') && event.facebook.appSecret) {
                        delete event.facebook.appSecret;
                    }

                    return event;
                })});

            }
        );
    });

    app.get('/events/:eventId', function (req, res, next) {

        Step(
            function () {
                Event.findById(req.params.eventId, this);
            },
            function (err, event) {                
                if(err) return next(err);
                if(!event) {res.send(404); return; }

                event = event.toJSON();

                if(event.hasOwnProperty('facebook') && event.facebook.appSecret) {
                    delete event.facebook.appSecret;
                }

                res.render('events', { event: event });
            }
        );
    });
};
