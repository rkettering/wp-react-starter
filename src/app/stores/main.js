var Reflux = require('reflux');



var actions = Reflux.createActions([
    "someAction"
]);




var store = Reflux.createStore({
    listenables: [actions],
    data: null,

    init: function() {
        this.data = {
            isInitialized: false,
            isAuthenticated: false
        };

        // TODO: listen to ajax api and trigger initialize shiz
    },
    getInitialState: function() {
        return this.data;
    },


    onSomeAction: function(x) {
        this.trigger(this.data);
    }
});



module.exports = {store: store, actions: actions};