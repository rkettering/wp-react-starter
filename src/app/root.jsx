var Backbone = require('backbone');
var React = require('react/addons');
var Reflux = require('reflux');

var navigateActionStore = require('./stores/navigate.js');
var mainActionStore = require('./stores/main.js');

var SlideInOut = require('./components/shared/SlideInOut.jsx');

require('./root.scss');

var Root = React.createClass({
    mixins: [Reflux.connect(navigateActionStore.store, "navigate"), 
        Reflux.connect(mainActionStore.store, "main")],

    render: function() {

return this.state.navigate.current.react ? 
                this.renderCurrentSection() : 
                this.renderMessage('No active section...');

        // if(!this.state.main.isInitialized) {
        //     return this.renderMessage('Initializing...');
        // }

        // if(!this.state.main.isAuthenticated) {
        //     return this.renderMessage('Not authenticated. :(');
        // } 

        // else {
        //     return this.state.navigate.current.react ? 
        //         this.renderCurrentSection() : 
        //         this.renderMessage('No active section...');
        // }

    },
    renderMessage: function(msg) {
        return <h3 style={{color: '#cccccc'}}>{msg}</h3>;
    },
    renderCurrentSection: function() {
        var current = this.state.navigate.current,
            CurrentSection = current.react;

        return (
            <div className="root-component">
                <React.addons.TransitionGroup component="div" className="section-wrapper">
                    <SlideInOut key={current.name}>
                        <CurrentSection {...this.state.main} /> 
                    </SlideInOut>
                </React.addons.TransitionGroup>
            </div>
        );
    }
});

module.exports = Root;


