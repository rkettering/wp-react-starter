require('./rootError.scss');
var React = require('react');

var RootError = React.createClass({
    render: function() {
        if(!this.props.error) { return null; }
        return (
            <div className="root-error">
                {this.props.hideHandler && 
                    <div className="button-hide"><button onClick={this.props.hideHandler}>✕</button></div>
                }
                <div className="top">{this.props.error.status} - {this.props.error.text} (code {this.props.error.code})</div>
                <div className="body">
                    <div className="message">message: <p>{this.props.error.message}</p></div>
                    <div className="dev-msg">developerMessage: <p>{this.props.error.developerMessage}</p></div>
                </div>
            </div>
        );
    }
});

module.exports = RootError;