var Reflux = require('reflux');

var actions = Reflux.createActions([
    "authenticate",
    "authenticated",
    "authenticateFailed",
    "authenticateCached",
    "unableToAuthenticateWithCachedValues"
]);


// SERVICE
var service = {
    url: 'authentication/'
};
    
// OPERATION - authenticate
service.authenticate = {
    url: 'authenticate.biws',
    execute: function(username, password) {
        var Api = require('./api.js').api,
            data = {username: username, password: password};

        return Api.ajax(service.url+this.url, data)
            .done(function(data, status, xhr) {
                if(xhr.status == 204) {
                    actions.authenticateFailed(data);
                } else {
                    actions.authenticated(data);
                }
            })
            .always(function() {
                
            });
    }
};


actions.authenticateCached.listen(function(){
    var u = sessionStorage.getItem('username'),
        p = sessionStorage.getItem('password');

        if(u && p) {
            service.authenticate.execute(u, p);
        } else {
            actions.unableToAuthenticateWithCachedValues();
        }
});


actions.authenticate.listen(function(user,pass){
    sessionStorage.setItem('username',user);
    sessionStorage.setItem('password',pass);
    service.authenticate.execute(user, pass);
});

module.exports = {service: service, actions: actions};





// /buzz/1/authentication/authenticate.biws

// MODEL
// ParticipantView {
// user (UserView, optional),
// sessionId (string, optional),
// token (string, optional)
// }
// UserView {
// id (integer): User identifier in system (userId),
// firstName (string): User first name,
// lastName (string): User last name,
// smallAvatarUrl (string, optional): Small Avatar Image,
// largeAvatarUrl (string, optional): Large Avatar Image,
// positionType (string, optional): User positionType,
// manager (boolean, optional)
// }

// SCHEMA
// {
//   "user": {
//     "id": 0,
//     "firstName": "",
//     "lastName": "",
//     "smallAvatarUrl": "",
//     "largeAvatarUrl": "",
//     "positionType": "",
//     "manager": false
//   },
//   "sessionId": "",
//   "token": ""
// }

// MODEL
// LoginToken {
// username (string, optional),
// password (string, optional),
// token (string, optional)
// }

// SCHEMA
// {
//   "username": "",
//   "password": "",
//   "token": ""
// }