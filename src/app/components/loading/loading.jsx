require('./loading.scss');
var React = require('react');

var Loading = React.createClass({
    render: function() {
        var logo = '❄';
        return (
            <div className="loading-component">
                <div className="loading-box">
                    <div className="logo">
                        <div>
                            <div className="symb">{logo}</div>
                        </div>
                        BUZZ
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Loading;