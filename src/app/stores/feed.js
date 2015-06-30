var Reflux = require('reflux');

var FeedApi = require('./api/feed.js');
var MainStore = require('./main.js');



var actions = Reflux.createActions([
    "populate"
]);




var store = Reflux.createStore({
    listenables: [actions, FeedApi.actions],
    data: null,

    init: function() {
        this.data = {};
    },
    getInitialState: function() {
        return this.data;
    },


    // local
    onPopulate: function() {
        FeedApi.actions.populateFeed(MainStore.store.data.user.id);
    },


    // feed action handlers
    onFeedPopulated: function(data) {
        this.data.feeds = data.resultFeeds;
        this.trigger(this.data);
    }
});



module.exports = {store: store, actions: actions};