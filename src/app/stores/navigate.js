var Reflux = require('reflux');


var actions = Reflux.createActions([
	"sectionNavigate"
]);


var SECTION = {
    LOGIN: 'login',
    HOME: 'home'
};


var store = Reflux.createStore({
    listenables: [actions],

    data: {},

    init: function() {
        this.data = {
            current: {name: null, react: null},
            last: {name: null, react: null}
        };
    },
    getInitialState: function() {
        return this.data;
    },


    // get passed a react constructor (loaded in a webpack codesplit)
    onSectionNavigate: function(react, name) {
        if(typeof react !== 'function') {
            console.error('navigate.onSectionNavigate expected a function, was: ', react);
            return;
        }
        // is this the active section already? do nothing then
        if(this.data.current.name == name) {
            console.log('navigate.onSectionNavigate navigated to same section: ', name);
            return;
        }
        this.data.last = this.data.current;
        this.data.current = {name: name, react: react};
        this.trigger(this.data);
    }
});



module.exports = {store: store, actions: actions, SECTION: SECTION};