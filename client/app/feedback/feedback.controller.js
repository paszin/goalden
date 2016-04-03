'use strict';

angular.module('goaldenAppApp')
    .controller('FeedbackCtrl', function ($scope) {
        $scope.profile = {feedback_count: 10, games_count: 6};
        $scope.data = {
            labels: ['Thumbs Up', 'Smile', 'Excellent Player', 'High Five'],
            series: [
                    [5, 4, 3, 7]
                ],
            
                horizontalBars: true
            
        };
    });