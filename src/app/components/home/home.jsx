var React = require('react');
var Reflux = require('reflux'); 


var Home = React.createClass({
    render: function() {
        return (
            <div>
            	{'HOME'}
            	{this.props}
            	
            </div>
        );
    }
});

module.exports = Home;