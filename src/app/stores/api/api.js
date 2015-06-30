/*global _config_*/
var $ = require('jquery');
var _ = require('underscore');
var Reflux = require('reflux');

var actions = Reflux.createActions([
    // in
    'initialize',

    // out
    'apiInitialized',
    'apiAjaxFail'
]);

function url(service){
    return _config_.url+'/'+service;
}

var Api = {
    ajax: function(service, data) {
        $.support.cors = true;
        return $.ajax({
            url: url(service),
            dataType: 'json',
            contentType: 'application/json',
            type: 'POST',
            data: JSON.stringify(data||{})
        }).done(function(data, textStatus, jqXHR) {
            actions.apiInitialized();
            require('../main.js').actions.clearApiAjaxError();
        }).fail(function(jqXHR, textStatus, errorThrown) {
            actions.apiAjaxFail(
                _.extend({}, jqXHR.responseJSON, {
                    status: jqXHR.status,
                    text: jqXHR.statusText
                })
            );
        });
    }
};

module.exports = {api: Api, actions: actions};