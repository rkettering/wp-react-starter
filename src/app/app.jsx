var Backbone = require('backbone');
var React = require('react/addons');

var Root = require('./root.jsx');

var navigateActionStore = require('./stores/navigate.js');
var mainActionStore = require('./stores/main.js');


var App = Backbone.Router.extend({
    routes: {
        "home": "home",
        "login": "login", 

        // default
        "": "home"
    },

    home: function() {
        // webpack split-point to create new chunks
        require.ensure([], function() {
            var Home = require('./components/home/home.jsx');
            navigateActionStore.actions.sectionNavigate(Home, 'home');
        });
    },

    login: function() {
        // webpack split-point to create new chunks
        require.ensure([], function() {
            var Login = require('./components/login/login.jsx');
            navigateActionStore.actions.sectionNavigate(Login, 'login');
        });
    }
});

module.exports = new App();
Backbone.history.start(); 

React.render(<Root/>, document.getElementById('app-root'));


// listen for appropriate state from main action store to start app
mainActionStore.store.listen( function(mainStore) {

});



