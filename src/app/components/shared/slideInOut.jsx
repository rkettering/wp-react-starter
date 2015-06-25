var React = require('react');
var $ = require('jquery');

var transitionDuration = 1;
var transitionString = 'left Ωs, transform Ωs'.replace(/Ω/g, transitionDuration);


// this must be wrapped in React.addons.TransitionGroup
var SlideInOut = React.createClass({
    // called if this is a child of a <ReactTransitionGroup>
    componentDidAppear: function() {
        this.animateIn();
    },
    componentDidEnter: function() {
        this.animateIn();
    },
    componentWillLeave: function(callback) {
        this.animateOut(callback);
    },

    render: function() {
        var style =  {
                left: this.props.position == 'left' ? -$(window).width() : $(window).width(),
                transition: transitionString,
                transformOrigin: 'right',
                transformStyle: 'preserve-3d',
                transform: 'rotateY(0deg)'
            };

        return (
            <div className="slide-in-out" style={style}>
                {this.props.children}
            </div>
        );
    },
    animateIn: function(callback) {
        setTimeout(function(){ 
            $(this.getDOMNode()).css({
                left: 0,
                zIndex: 1
            });
            if(callback) { callback(); }
        }.bind(this), 0);
    },
    animateOut: function(callback) {
        $(this.getDOMNode()).css({
            left: -($(window).width()),
            transform: 'rotateY(-84deg)',
            zIndex: 0
        });
        setTimeout(callback, transitionDuration*1000);
    }
});

module.exports = SlideInOut;