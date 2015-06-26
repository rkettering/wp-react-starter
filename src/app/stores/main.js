var Reflux = require('reflux');

var Api = require('./api/api.js');
var Authentication = require('./api/authentication.js');



var actions = Reflux.createActions([
    "clearApiAjaxError"
]);




var store = Reflux.createStore({
    listenables: [actions, Api.actions, Authentication.actions],
    data: null,

    init: function() {
        this.data = {
            isInitialized: false,
            isAuthenticated: false
        };
    },
    getInitialState: function() {
        return this.data;
    },

    // local action handlers
    onClearApiAjaxError: function() {
        if(!this.data.apiAjaxError) { return; }
        this.data.apiAjaxError = null;
        this.trigger(this.data);
    },


    // api action handlers
    onApiInitialized: function() {
        this.data.isInitialized = true;
        this.trigger(this.data);
    },
    onApiAjaxFail: function(failObj) {
        this.data.apiAjaxError = failObj;
        this.trigger(this.data);
    },

    // authenticate action handlers
    onAuthenticated: function(data) {
        console.log('main.onAuthenticated', data);
        if(data.user) {
            this.data.user = data.user;
        }
        this.data.isAuthenticated = true;
        this.trigger(this.data);
    },
    onAuthenticateFailed: function() {
        this.data.isAuthenticated = false;
        this.trigger(this.data);
    }
});



module.exports = {store: store, actions: actions};