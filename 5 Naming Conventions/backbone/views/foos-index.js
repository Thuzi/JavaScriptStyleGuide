
App.Views.FoosIndex = Support.CompositeView.extend({	
	templateSel: 'foos-index',

	initialize: function () {
		_.bindAll(this, 'render');

    	this.collection.bind('reset', this.renderItems, this);
	},

	renderItems: function () {
		var el 		= {},
			els 	= [],
			that 	= this;

		this.collection.each(function (model) {
			var childView = new App.Views.FoosIndexItem({ model: model });

			that.renderChild(childView);
			els.push(childView.el);
		});

		this.$('tbody').empty().html(els);
	}
});
