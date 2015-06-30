require('./home.scss');
var React = require('react');
var Reflux = require('reflux'); 

var FeedStore = require('../../stores/feed.js');

var FeedItem = require('./feedItem.jsx');

var Home = React.createClass({
	mixins: [Reflux.connect(FeedStore.store, "feedStore")],
	componentDidMount: function() {
		FeedStore.actions.populate();
	},
    render: function() {
        return (
            <div className="home-component">
            	{
            		this.state.feedStore.feeds &&
            		this.state.feedStore.feeds.map( function(feed, idx) {
            			return <FeedItem key={idx} {...feed} />;
            		})
            	}
            </div>
        );
    }
});

module.exports = Home;