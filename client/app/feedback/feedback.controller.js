'use strict';

angular.module('goaldenAppApp')
    .controller('FeedbackCtrl', function ($scope, Auth) {
        var user = Auth.getCurrentUser();
        $scope.profile = {
            feedback_count: user.feedback_count,
            games_count: user.games_count
        };
        $scope.data = {
            labels: ['Thumbs Up', 'Positive<br>Attitude', 'Excellent Player', 'High Five'],
            series: [
                    [user.feedback.thumbs_up, user.feedback.smile, user.feedback.excellent_player, user.feedback.high_five]
                ],
            horizontalBars: true
        };
    });