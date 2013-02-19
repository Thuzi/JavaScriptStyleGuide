
App.Routers.FoosRouter = Support.SwappingRouter.extend({
    routes: {
        'accounts': 'index',
        'accounts/:id': 'show'
    },
    
    index: function () {
    	this.viewify(App.Views.FoosIndex, { collection: this.collection });
    	this.collection.fetch();
    },

    show: function (id) {
        var options = {
            collection: this.collection,
            mode: 'edit',
            model: this.collection.get(id)
        }
        
        this.viewify(App.Views.FoosEdit, options);
    }
});
