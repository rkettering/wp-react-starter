var Reflux = require('reflux');



var actions = Reflux.createActions([
	"sectionNavigate"
]);




var store = Reflux.createStore({
    listenables: [actions],
    data: {},

    init: function() {
        this.data.react = {
            current: null
        };
    },
    getInitialState: function() {
        return this.data;
    },


    // get passed a react constructor (loaded in a webpack codesplit)
    onSectionNavigate: function(react) {
        if(typeof react !== 'function') {
            console.error('navigate.onSectionNavigate expected a function, was: ', react);
            return;
        }
        this.data.react.current = react;
        this.trigger(this.data);
    }
});



module.exports = {store: store, actions: actions};