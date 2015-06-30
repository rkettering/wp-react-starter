var Backbone = require('backbone');
var React = require('react/addons');

var Root = require('./root.jsx');

var MainActionStore = require('./stores/main.js');
var NavigateActionStore = require('./stores/navigate.js');
var AuthenticationActions = require('./stores/api/authentication.js').actions;


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
            NavigateActionStore.actions.sectionNavigate(Home, NavigateActionStore.SECTION.HOME);
        });
    },

    login: function() {
        // don't go to login page if already authenticated
        if(MainActionStore.store.data.isAuthenticated) {
            appInstance.navigate('home', {trigger: true, replace: false});
            return;
        }
        // webpack split-point to create new chunks
        require.ensure([], function() {
            var Login = require('./components/login/login.jsx');
            NavigateActionStore.actions.sectionNavigate(Login, NavigateActionStore.SECTION.LOGIN);
        });
    }
});



// initialize the router
var appInstance = new App();

// modularized, return the instance of the router (App)
module.exports = appInstance;




// start the history (for Backbone.Router)
Backbone.history.start(); // set silent=true to not trigger initial route 




// render the react Root element
React.render(<Root/>, document.getElementById('app-root'));




// tried to authenticate with stored auth info, but failed
AuthenticationActions.unableToAuthenticateWithCachedValues.listen( function() {
    // no authenticated, so go to login
    appInstance.navigate('login', {trigger: true, replace: true});
});

// listen for login/authenticated action
AuthenticationActions.authenticated.listen( function(data) {
    // when authenticated - go to home section
    appInstance.navigate('home', {trigger: true, replace: false});
});


// First thing is to try to authenticate with cached tokens/login info - handle results in above action listeners
AuthenticationActions.authenticateCached();


