
/*

3) modules
 3.1) export constructor functions, not assign methods into arguments

*/

var CloudFile           = require('../models/cloud-file').CloudFile,
    moment              = require('moment'),
    mongoose            = require('mongoose'),
    ObjectId            = Schema.Types.ObjectId,
    Schema              = mongoose.Schema,
    settings            = require('../config/settings').settings,
    Step                = require('step');

var FooSchema = new mongoose.Schema ({

    createdOn:    { type: Date,     required: true,   default: moment.utc, index: true },
    eventId:      { type: ObjectId, index: true,      required: true },
    url:          { type: String,   required: true },

    rfids: [{
            rfid: { type: String,   required: true }
            // for future tagging details
    }]

}, { versionKey: false });

FooSchema.statics.create = function (options, callback) {

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
        function saveToCloud () {
            cloudFile.save(file.path, fileFullName, 'foo/' + options.eventId, file.type, this);
        },
        function updateModel (err, response) {
            if (err) throw err;

            photo = new Photo({
                eventId:  options.eventId,
                _id:      id,
                url:      response.url
            });

            photo.save(callback);
        },
        function done (err) {
            callback(err);
        }
    );
};

/*
Indexes included with modules only when necessary (ex: sparse)

FooPhotoSchema.index({ eventId: 1, createdOn: 1 });
FooPhotoSchema.index({ eventId: 1, 'rfids.rfid': 1 });
FooPhotoSchema.index({ url: 1 });
FooPhotoSchema.index({ eventId: 1, url: 1 });
*/

exports.FooPhotoSchema = FooPhotoSchema;
exports.Foo = mongoose.model('Foo', FooPhotoSchema);

