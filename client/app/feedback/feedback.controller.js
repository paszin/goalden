'use strict';

angular.module('goaldenAppApp')
    .controller('FeedbackCtrl', function ($scope) {
        $scope.profile = {feedback_count: 10, games_count: 6};
        $scope.data = {
            labels: ['Thumbs up', 'Smile', 'XXX', 'XXX', 'XXX'],
            series: [
                    [5, 4, 3, 7, 6]
                ],
            
                horizontalBars: true
            
        };
    });