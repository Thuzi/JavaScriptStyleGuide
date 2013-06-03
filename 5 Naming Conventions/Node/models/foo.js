
/*
    Exception to the rule!
    Variables with dependencies have to be declared in dependency order
*/

var mongoose        = require('mongoose'),
    Schema          = mongoose.Schema,

    Mixed           = Schema.Types.Mixed,
    moment          = require('moment'),
    ObjectId        = Schema.Types.ObjectId
    

var FooSchema = new Schema({
    active:         { type: Boolean, default: true },   
    title:          { type: String }
});

exports.FooSchema = FooSchema;
exports.Foo = mongoose.model('Answer', FooSchema);
