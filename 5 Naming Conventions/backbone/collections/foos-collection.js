
App.Collections.FoosCollection = Backbone.Collection.extend({
	model: App.Models.Foo,
	url: '/foos'
});
