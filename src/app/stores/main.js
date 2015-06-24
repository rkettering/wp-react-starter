var Reflux = require('reflux');



var actions = Reflux.createActions([
	"someAction"
]);




var store = Reflux.createStore({
    listenables: [actions],
    data: {},

    init: function() {
        this.data = {test: 'Hello mine freund!', b: 'yes'}
    },
    getInitialState: function() {
        return this.data;
    },


    onSomeAction: function(x) {
        this.trigger(this.data);
    }
});



module.exports = {store: store, actions: actions};