var Backbone = require('backbone');
var React = require('react/addons');

var Root = require('./root.jsx');

var navigateActionStore = require('./stores/navigate.js');
var mainActionStore = require('./stores/main.js');

require('./stores/api/api.js');

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

// initialize the router
var appInstance = new App();

// modularized, return the instance of the router (App)
module.exports = appInstance;

// start the history (for Backbone.Router)
Backbone.history.start(/*{silent: true}*/); // set silent=true to not trigger initial route 



// render the react Root element
React.render(<Root/>, document.getElementById('app-root'));



// listen to main action store
mainActionStore.store.listen( function(mainStore) {
    console.log('mainActionStore.store.listen', mainStore);
    // if is initialized, but not authenticated then route to login
    if(!mainStore.isAuthenticated) {
        // navigate to login section
        // trigger = true - causes the route handler to be called
        // replace = true - do not create browser history 
        appInstance.navigate('login', {trigger: true, replace: true});
    }
});

// assume we need to go to the login page (assume we are not logged in on first load)
appInstance.navigate('login', {trigger: true, replace: true});



