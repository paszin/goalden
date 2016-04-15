'use strict';

angular.module('goaldenAppApp')
    .controller('FeedbackCtrl', function ($scope, User) {

        $scope.chartObject = {};
        $scope.feedbackOptions = [{
            icon: "fa fa-thumbs-up",
            info: "Great Job",
            name: "thumps_up"
        }, {
            icon: "fa fa-smile-o",
            info: "Positive Attitude",
            name: "smile"
        }, {
            icon: "fa fa-trophy",
            info: "Excellent Player",
            name: "excellent_player"
        }, {
            icon: "fa fa-hand-paper-o",
            info: "Virtual High Five",
            name: "high_five"
        }];

        $scope.feedback = {thumps_up: 0, smile: 0, excellent_player: 0, high_five: 0};
    
        $scope.lookup = function(name) {
          return _.find($scope.feedbackOptions, {name: name});  
        };
    
        $scope.chartObject.type = "BarChart";
        $scope.chartObject.options = {
            'title': 'My Feedback'
        };
            
        $scope.chartObject.data = {"cols": [
                {id: "t", label: "feedback", type: "string"},
                {id: "s", label: "Count", type: "number"}
            ], "rows": [
                {c: [
                    {v: "Thumps Up"},
                    {v: $scope.feedback.thumps_up},
                ]},
                {c: [
                    {v: "Positive Attitude"},
                    {v: $scope.feedback.smile}
                ]},
                {c: [
                    {v: "Excellent Player"},
                    {v: $scope.feedback.excellent_player},
                ]},
                {c: [
                    {v: "High Five"},
                    {v: $scope.feedback.high_five},
                ]}
            ]};

    
        $scope.refresh = function () {
            User.get(function (user) {
                for (var i=0; i<user.feedback.length; i++) {
                    $scope.feedback[user.feedback[i].name] = user.feedback[i].count; 
                }
                $scope.profile = user;
            });
        };
    
    $scope.refresh();

    });