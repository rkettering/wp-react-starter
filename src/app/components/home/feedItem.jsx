require('./feedItem.scss');
var _ = require('underscore');
var React = require('react');
 
var FeedItem = React.createClass({
	componentDidMount: function() {
		
	},
    render: function() {
        return (
            <div className="feed-item-component">
                {
                    this.props.feedDetail ? 
                        <FeedItemDetail {...this.props.feedDetail} /> :
                        <FeedItemSummary {...this.props.feedSummary} />
                }
            </div>
        );
    }
});

var FeedItemSummary = React.createClass({
    render: function() {
        return (
            <div className="feed-item-summary">
                {this.props.description}
            </div>
        );
    }
});

var FeedItemDetail = React.createClass({
    render: function() {
        var time = this.props.dateView.displayTime,
            sub = this.props.submitter;
        return (
            <div className="feed-item-detail">
                <div className="head">
                    <div className="avatar">
                        <img src={sub && sub.smallAvatarUrl} />
                    </div>
                    <div className="name-line">
                        {sub && sub.firstName}: 
                        <span className="time">
                            {time}
                        </span>
                    </div>
                    <div className="description">
                        {this.props.message}
                    </div>
                </div>
                <div className="body">
                    <div className="tagged">
                        Tagged in this post:

                    </div>
                    <div className="content" style={{fontSize: '0.7em'}}>
                    FEED DETAIL:
                    {
                        _.reduce(this.props, function(mem, val, key) {
                            if(val){ mem.push(<div><b>{key}</b>: 
                                {_.isObject(val)?'[obj]':val}</div>); }
                            return mem;
                        }, [])
                    }
                    </div>
                </div>
                <div className="foot">
                    <div className="comment-count"></div>
                    <div className="star-count"></div>
                </div>
            </div>
        );
    }
});


module.exports = FeedItem;