require('./home.scss');
var React = require('react');
var Reflux = require('reflux'); 

var FeedStore = require('../../stores/feed.js');

var Home = React.createClass({
	mixins: [Reflux.connect(FeedStore.store, "feedStore")],
	componentDidMount: function() {
		
	},
    render: function() {
        return (
            <div className="home-component">
            	{
            		this.state.feedStore.feeds &&
            		this.state.feedStore.feeds.map( function(feed, idx) {
            			return <div key={idx} className="feed-item">{feed.feedSummary.description}</div>;
            		})
            	}
            </div>
        );
    }
});

module.exports = Home;