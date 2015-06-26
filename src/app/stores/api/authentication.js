var Reflux = require('reflux');

var actions = Reflux.createActions([
    "authenticate",
    "authenticated",
    "authenticateFailed"
]);


// SERVICE
var Service = {
    url: 'authentication/'
};
    
// OPERATION - authenticate
Service.authenticate = {
    url: 'authenticate.biws',
    execute: function(username, password) {
        var Api = require('./api.js').api,
            data = {username: username, password: password};

        return Api.ajax(Service.url+this.url, data)
            .done(function(data, status, xhr) {
                //console.log('authentication.authenticate.execute.done', jqXHR);
                if(xhr.status == 204) {
                    actions.authenticateFailed();
                } else {
                    console.log('authenticate.execute', data);
                    actions.authenticated(data);
                }
            })
            .always(function() {
                console.log('done done done');
            });
    }
};

actions.authenticate.listen(function(user,pass){
    Service.authenticate.execute(user, pass);
});

module.exports = {service: Service, actions: actions};





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