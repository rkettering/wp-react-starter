var React = require('react');
var Reflux = require('reflux'); 


var Home = React.createClass({
    render: function() {
        return (
            <div style={{background: 'gray'}}>
            	{'HOME'}
            	<a href='#login'>Login</a>
            </div>
        );
    }
});

module.exports = Home;