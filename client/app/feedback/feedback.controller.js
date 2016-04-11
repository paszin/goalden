'use strict';

angular.module('goaldenAppApp')
    .controller('FeedbackCtrl', function ($scope, User) {

        $scope.refresh = function () {
            User.get(function (user) {
                var feedback = {};
                for (var i=0; i<user.feedback.length; i++) {
                    feedback[user.feedback[i].name] = user.feedback[i].count; 
                }
                $scope.profile = user;
                $scope.data = {
                    labels: ['Thumbs Up', 'Positive<br>Attitude', 'Excellent Player', 'High Five']
                    , series: [
                    [feedback.thumbs_up, feedback.smile, feedback.excellent_player, feedback.high_five]
                ]
                    , horizontalBars: true
                };
            });

        };
    
    $scope.refresh();

    });