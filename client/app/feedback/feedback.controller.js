'use strict';

angular.module('goaldenAppApp')
    .controller('FeedbackCtrl', function ($scope, User) {
        User.get(function (user) {
            $scope.profile = user;
            $scope.data = {
                labels: ['Thumbs Up', 'Positive<br>Attitude', 'Excellent Player', 'High Five']
                , series: [
                    [user.feedback.thumbs_up, user.feedback.smile, user.feedback.excellent_player, $scope.profile.feedback.high_five]
                ]
                , horizontalBars: true
            };
        });

    });