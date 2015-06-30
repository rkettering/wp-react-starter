require('./feedItem.scss');
var React = require('react');
 
var FeedItem = React.createClass({
	componentDidMount: function() {
		
	},
    render: function() {
        var fs = this.props.feedSummary,
            sub = fs.submitter;
        return (
            <div className="feed-item-component">
                <div className="head">
                    <div className="avatar">
                        <img src={sub && sub.smallAvatarUrl} />
                    </div>
                    <div className="name-line">
                        {sub && sub.firstName}: 
                        <span className="time">
                            {fs.dateView.rawDate}
                        </span>
                    </div>
                    <div className="description">
                        {fs.description}
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