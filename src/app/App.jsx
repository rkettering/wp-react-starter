

var Backbone = require('backbone');
var React = require('react');
var Reflux = require('reflux');

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
            navigateActionStore.actions.sectionNavigate(Home);
        });
    },

    feed: function() {

    },

    notifications: function() {

    },

    profile: function() {

    },

    settings: function() {

    },

    login: function() {
        // webpack split-point to create new chunks
        // require.ensure([], function() {
        //     var Login = require('../login/LoginPage.jsx');
        //     React.render(<Login/>, document.getElementById('appContent'));
        // });
    }

});

Backbone.history.start();




var Root = React.createClass({
    mixins: [Reflux.connect(navigateActionStore.store, "navigate"), Reflux.connect(mainActionStore.store, "main")],
    render: function() {
        var Section = this.state.navigate.react.current || null;
        return (
            <div>
                {Section ?
                    <Section {...this.state.main} />
                     : 'NO CURRENT NAV COMP'}
            </div>
        );
    }
});

React.render(<Root/>, document.getElementById('appRoot'));




module.exports = new App();
