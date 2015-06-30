var Reflux = require('reflux');
var _ = require('underscore');

var actions = Reflux.createActions([
    "populateFeed",
    "feedPopulated"
]);


// SERVICE
var service = {
    url: 'feed/'
};

var payload = {
    // "startDate": "",
    // "endDate": "",
    // "type": "",
    // "maxRows": 0,
    // "userId": 0,
    // "pageNumber": 0,
    // "pageSize": 0,
    // "maxScore": 0,
    // "minScore": 0
};
    
// OPERATION - authenticate
service.popular = {
    url: 'popularFeed.biws',
    execute: function(userId) {
        var Api = require('./api.js').api,
            data = _.extend({}, payload, {userId: userId});

        return Api.ajax(service.url+this.url, data)
            .done(function(data, status, xhr) {
                //console.log('authentication.authenticate.execute.done', jqXHR);
                if(xhr.status == 204) {
                    actions.feedFailed(data);
                } else {
                    actions.feedPopulated(data);
                }
            })
            .fail(function(xhr, status, error){
                console.error(xhr, status, error);
                actions.feedFailed();
            })
            .always(function() {
                
            });
    }
};

actions.populateFeed.listen( function(userId){
    service.popular.execute(userId);
});



module.exports = {service: service, actions: actions};


// {
//   "startDate": "",
//   "endDate": "",
//   "type": "",
//   "maxRows": 0,
//   "userId": 0,
//   "pageNumber": 0,
//   "pageSize": 0,
//   "maxScore": 0,
//   "minScore": 0
// }
// PopularFeedRequest {
// startDate (string, optional): The start date for the criteria,
// endDate (string, optional): The end date for the criteria,
// type (string, optional),
// maxRows (integer, optional),
// userId (integer): The id of the user the request is acting on behalf of,
// pageNumber (integer, optional),
// pageSize (integer, optional),
// maxScore (integer, optional),
// minScore (integer, optional)
// }



// [
//   {
//     "feedSummary": {
//       "submitter": {
//         "id": 0,
//         "firstName": "",
//         "lastName": "",
//         "smallAvatarUrl": "",
//         "largeAvatarUrl": "",
//         "positionType": "",
//         "manager": false
//       },
//       "description": "",
//       "notificationText": "",
//       "recipient": {
//         "id": 0,
//         "firstName": "",
//         "lastName": "",
//         "smallAvatarUrl": "",
//         "largeAvatarUrl": "",
//         "positionType": "",
//         "manager": false
//       },
//       "imageUrl": "",
//       "notificationType": "",
//       "notificationHistoryId": 0,
//       "viewed": false,
//       "linkData": {
//         "payload": "Map[string,Object]"
//       },
//       "clickable": false,
//       "dateView": {
//         "displayDate": "",
//         "displayTime": "",
//         "rawDate": ""
//       }
//     },
//     "feedDetail": {
//       "id": 0,
//       "type": "",
//       "title": "",
//       "message": "",
//       "imageUrl": "",
//       "dateView": {
//         "displayDate": "",
//         "displayTime": "",
//         "rawDate": ""
//       },
//       "calculatedScore": 0,
//       "orgChartScore": 0,
//       "likeCount": 0,
//       "likes": [
//         {
//           "date": "",
//           "user": {
//             "id": 0,
//             "firstName": "",
//             "lastName": "",
//             "smallAvatarUrl": "",
//             "largeAvatarUrl": "",
//             "positionType": "",
//             "manager": false
//           }
//         }
//       ],
//       "commentCount": 0,
//       "comments": [
//         {
//           "message": "",
//           "imageUrl": "",
//           "dateView": {
//             "displayDate": "",
//             "displayTime": "",
//             "rawDate": ""
//           },
//           "user": {
//             "id": 0,
//             "firstName": "",
//             "lastName": "",
//             "smallAvatarUrl": "",
//             "largeAvatarUrl": "",
//             "positionType": "",
//             "manager": false
//           }
//         }
//       ],
//       "taggedUsers": [
//         {
//           "id": 0,
//           "firstName": "",
//           "lastName": "",
//           "smallAvatarUrl": "",
//           "largeAvatarUrl": "",
//           "positionType": "",
//           "manager": false
//         }
//       ],
//       "behaviors": [
//         {
//           "code": "",
//           "name": ""
//         }
//       ],
//       "scoreExplanation": {
//         "entryCount": 0,
//         "typeSummary": "Map[string,ScoreEntryDetails]"
//       },
//       "submitter": {
//         "id": 0,
//         "firstName": "",
//         "lastName": "",
//         "smallAvatarUrl": "",
//         "largeAvatarUrl": "",
//         "positionType": "",
//         "manager": false
//       },
//       "islikedByUser": false,
//       "isCommentedByUser": false,
//       "weight": 0,
//       "awardsGivenToUser": false,
//       "usedBudget": 0,
//       "allowAddPoints": false,
//       "budgetName": "",
//       "totalBudget": 0,
//       "awardAmountMax": 0,
//       "hardCap": false,
//       "awardAmountMin": 0,
//       "budgetId": 0,
//       "availableBudget": 0,
//       "awardAmountFixed": false,
//       "fixedAwardAmount": 0
//     },
//     "weight": 0,
//     "calculatedWeight": 0
//   }
// ]




// FeedView {
// feedSummary (FeedSummaryView): Summary of Feed,
// feedDetail (StoryView): Full details of Feed,
// weight (integer, optional),
// calculatedWeight (integer, optional)
// }
// FeedSummaryView {
// submitter (UserView): The submitter of the Activity,
// description (string): The description of the notification,
// notificationText (string): The notificationText,
// recipient (UserView): The recipient of the Activity,
// imageUrl (string, optional): Image url for notification,
// notificationType (string) = ['story' or ' poll' or ' tempCheck' or ' award' or ' anniversary' or ' diyquiz']: The Notification Type,
// notificationHistoryId (integer, optional): ID for the database-backed element, if it exists (some notifications may just be temporal),
// viewed (boolean): true or false if user has viewed notification,
// linkData (LinkDataView): Data required to produce a detail for this type,
// clickable (boolean): true or false if this item is clickable on front end,
// dateView (DateView): The Date Object containing optional Date/Timestamp for the given Notification/Activity
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
// LinkDataView {
// payload (Map[string,Object]): Arguments for return calls to REST Services
// }
// DateView {
// displayDate (string): The optional Date for the given Notification used for dispay,
// displayTime (string): The optional Timestamp for the given Notification used for dispay,
// rawDate (string): The optional Date/Timestamp for the given Notification
// }
// StoryView {
// id (integer): The ID for the Story or Announcement,
// type (string, optional) = ['story' or 'announcement']: What type of Story this is,
// title (string, optional): The text/title overlay of any image that might have been uploaded,
// message (string): The comment for the Story.,
// imageUrl (string, optional): The URL to the uploaded image for this Story,
// dateView (DateView): The Date Object containing the Date/Timestamp for the given Story/Announcement,
// calculatedScore (integer, optional): The calculated score: TBD,
// orgChartScore (integer, optional): The calculated Organization score: TBD,
// likeCount (integer, optional): The number of times this Story has been liked,
// likes (array[LikeView], optional): The collection of Comments for this Story,
// commentCount (integer, optional): The number of times this Story has been commented,
// comments (array[CommentView], optional): The collection of Comments for this Story,
// taggedUsers (array[UserView], optional): List of all the users tagged for this Story,
// behaviors (array[PickListView], optional): List of all the behaviors assigned to this Story,
// scoreExplanation (ScoreExplanationView, optional): Description of the score results,
// submitter (UserView, optional): The ID of the submitter of story/announcement,
// islikedByUser (boolean, optional): Flag indicating if the user has 'liked' the story/announcement,
// isCommentedByUser (boolean, optional): Flag indicating if the user has commented on the story/announcement,
// weight (integer): The weight of the story - used for determining order/importance for global/popular,
// awardsGivenToUser (boolean, optional),
// usedBudget (number): Used Budget Value,
// allowAddPoints (boolean): Is adding points allowed,
// budgetName (string): The Display name of the Budget,
// totalBudget (number): Total Budget Value,
// awardAmountMax (integer): Award amount maximum if awarding allowed in range,
// hardCap (boolean): Is Budget Hard Cap,
// awardAmountMin (integer): Award amount minimum if awarding allowed in range,
// budgetId (integer): The ID of the Budget,
// availableBudget (number): Available Budget Value,
// awardAmountFixed (boolean): Is award amount fixed,
// fixedAwardAmount (integer): Fixed award amount value
// }
// LikeView {
// date (string): The Date/Timestamp the like was made,
// user (UserView): The User who liked the comment
// }
// CommentView {
// message (string): The Comment,
// imageUrl (string, optional): The optional image url for the comment,
// dateView (DateView): The Date Object containing optional Date/Timestamp for the given comment,
// user (UserView): The User who created the comment
// }
// PickListView {
// code (string, optional),
// name (string, optional)
// }
// ScoreExplanationView {
// entryCount (integer, optional),
// typeSummary (Map[string,ScoreEntryDetails], optional)
// }

