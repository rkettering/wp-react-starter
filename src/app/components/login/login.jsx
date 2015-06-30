require('./login.scss');
var $ = require('jquery');
var React = require('react');
var Reflux = require('reflux');

// authentication service
var Authentication = require('../../stores/api/authentication.js');
var MainStore = require('../../stores/main.js');

var Login = React.createClass({
    mixins: [Reflux.connect(MainStore.store, 'mainStore')],
    render: function() {
        var logo = '❄';
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
                        <div>
                            <input className="user-input"
                                ref="username" 
                                type="text" 
                                placeholder="username" 
                                onKeyUp={this.handleKeyup} />
                        </div>
                        <div>
                            <input className="password-input" 
                                ref="password"
                                type="password" 
                                placeholder="password" 
                                onKeyUp={this.handleKeyup} />
                        </div>
                        <div className="msg-space">{this.renderError()}</div>
                        <div>
                            <button className="submit" onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    renderError: function() {
        var error = this.state.mainStore.authenticationError;
        return error && <div className="error-box"><b>⚠</b> {error}</div> || null;
    },
    handleKeyup: function(e) {
        var $dom = $(React.findDOMNode(this)),
            $u = $dom.find('.user-input'),
            $p = $dom.find('.password-input');

        MainStore.actions.clearAuthenticationError();

        if(e.which == 13) {
            if($u.has(':focus')) { $p.focus(); }
            if($p.has(':focus')) { this.handleSubmit(); }
        }
    },
    handleSubmit: function(e) {
        var $dom = $(React.findDOMNode(this)),
            $u = $dom.find('.user-input'),
            $p = $dom.find('.password-input');

        MainStore.actions.clearAuthenticationError();

        Authentication.actions.authenticate($u.val(), $p.val());
    }
});

module.exports = Login;