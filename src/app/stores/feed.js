var Reflux = require('reflux');

var FeedApi = require('./api/feed.js');
var MainStore = require('./main.js');



var actions = Reflux.createActions([
    
]);




var store = Reflux.createStore({
    listenables: [actions, FeedApi.actions],
    data: null,

    init: function() {
        this.data = {};
        FeedApi.actions.populateFeed(MainStore.store.data.user.id);
    },
    getInitialState: function() {
        return this.data;
    },




    // feed action handlers
    onFeedPopulated: function(data) {
        this.data.feeds = data.resultFeeds;
        this.trigger(this.data);
    }
});



module.exports = {store: store, actions: actions};