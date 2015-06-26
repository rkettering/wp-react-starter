var Backbone = require('backbone');
var React = require('react/addons');
var Reflux = require('reflux');

var navigateActionStore = require('./stores/navigate.js');
var mainActionStore = require('./stores/main.js');

var SlideInOut = require('./components/shared/slideInOut.jsx');
var RootError = require('./components/shared/rootError.jsx');

require('./root.scss');

var Root = React.createClass({
    mixins: [Reflux.connect(navigateActionStore.store, "navigate"), 
        Reflux.connect(mainActionStore.store, "main")],

    render: function() {
        var rendered = null;

        // if not authenticated, and the route/nav is not login -- then render something else
        if(!this.state.main.isAuthenticated && this.state.navigate.current.name != 'login') {
            rendered = this.renderMessage('Not authenticated. :(');
        } 

        // ok, lets render the current section
        else {
            rendered = this.state.navigate.current.react ? 
                this.renderCurrentSection() : 
                this.renderMessage('No active section...');
        }

        return (
            <div className="root-component">
                {rendered}
                <RootError error={this.state.main.apiAjaxError} hideHandler={this.handleErrorHide} />
            </div>
        );
    },

    renderMessage: function(msg) {
        return <h3 className="root-message">{msg}</h3>;
    },

    renderCurrentSection: function() {
        var current = this.state.navigate.current,
            CurrentSection = current.react;

        return (            
            <React.addons.TransitionGroup component="div" className="section-wrapper">
                <SlideInOut key={current.name}>
                    <CurrentSection {...this.state.main} /> 
                </SlideInOut>
            </React.addons.TransitionGroup>
        );
    },

    handleErrorHide: function() {
        mainActionStore.actions.clearApiAjaxError();
    }
});

module.exports = Root;


