require('./login.scss');
var $ = require('jquery');
var React = require('react');
var Reflux = require('reflux');

// authentication service
var Authentication = require('../../stores/api/authentication.js');

var Login = React.createClass({
    render: function() {
        var logo = (this.props.user && (<img src={this.props.user.smallAvatarUrl} />)) || '❄';
        return (
            <div className="login-component">
                <div className="login-box">
                    <div className="logo">
                        <div>
                            <div className="symb">{logo}</div>
                        </div>
                        BUZZ
                    </div>
                    <div className="controls">
                        <div><input className="user-input" type="text" placeholder="username" onKeyUp={this.handleKeyup} /></div>
                        <div><input className="password-input" type="password" placeholder="password" onKeyUp={this.handleKeyup} /></div>
                        <div><button className="submit" onClick={this.handleSubmit}>Submit</button></div>
                    </div>
                </div>
            </div>
        );
    },
    handleKeyup: function(e) {
        var $dom = $(React.findDOMNode(this)),
            $u = $dom.find('.user-input'),
            $p = $dom.find('.password-input');

        if(e.which == 13) {
            if($u.has(':focus')) { $p.focus(); }
            if($p.has(':focus')) { this.handleSubmit(); }
        }
    },
    handleSubmit: function(e) {
        var $dom = $(React.findDOMNode(this)),
            $u = $dom.find('.user-input'),
            $p = $dom.find('.password-input');

        Authentication.actions.authenticate($u.val(), $p.val());
    }
});

module.exports = Login;