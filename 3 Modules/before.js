
var mongoose            = require('mongoose');
var Schema              = mongoose.Schema;
var ObjectId            = Schema.Types.ObjectId;
var moment              = require('moment');
var Step                = require('step');
var CloudFile           = require('../models/cloud-file').CloudFile;
var settings            = require('../config/settings').settings;

var FooSchema = new mongoose.Schema({

    createdOn: { type: Date, required: true, default: moment.utc, index: true },
    eventId: { type: ObjectId, index: true, required: true },
    url: { type: String, required: true },

    rfids: [{
            rfid: { type: String, required: true }
            // for future tagging details
    }]

}, { versionKey: false });

FooSchema.statics.create = function (options, callback) {
   /*

    options = {
        file: 'path',
        eventId: '..'
    }

   */

   var cloudFile       = new CloudFile(settings.foo),
       Photo           = mongoose.model('FooPhoto', FooPhotoSchema),
       photo           = {},

   // uploaded file stuff
       file            = options.file,
       fileName        = file.path.split('/').pop(),
       fileExtension   = file.name.split('.').pop(),
       id              = mongoose.Types.ObjectId(),
       fileFullName    = id.toString() + '.' + fileExtension, //fileName + '.' + fileExtension,

       errorResult     = undefined,
       that            = this;

    Step(
        function () {
            cloudFile.save(file.path, fileFullName, 'foo/' + options.eventId, file.type, this);
        },
        function (err, response) {
            if(err) throw err;

            photo = new Photo({
                _id: id,
                eventId: options.eventId,
                url: response.url
            });

            photo.save(callback);
        }
    );

};

FooPhotoSchema.index({ eventId: 1, createdOn: 1 });
FooPhotoSchema.index({ eventId: 1, 'rfids.rfid': 1 });
FooPhotoSchema.index({ url: 1 });
FooPhotoSchema.index({ eventId: 1, url: 1 });

mongoose.model('FooPhoto', FooPhotoSchema);

