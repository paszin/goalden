'use strict';



function DialogControllerFeedback($scope, $mdDialog, $http, Auth, game) {
    $scope.game = game;
    $scope.roles = ["mentors", "players"];
    $scope.imgUrl = 'https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png';
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
    
    
    $scope.updateFeedback = function (person, feedback) {
                person[feedback.name] = !person[feedback.name];
            };

            $scope.getStyle = function (person, feedback) {
                return {
                    "background-color": {
                        true: "light-green",
                        false: "white"
                    }[!!person[feedback.name]]
                };
            };
    
    $scope.saveDialog = function () {
                $mdDialog.show({
                    controller: function ($scope, $mdDialog) {
                        $scope.cancel = function () {
                            $mdDialog.cancel();
                            $location.path('/dashboard');
                        };
                    },
                    clickOutsideToClose: true,
                    //parent: angular.element('md-content'),
                    template: '<div layout="column" layout-margin layout-align="center center"><div>Saved</div><md-button ng-click="cancel()">ok</md-button>  </div>'
                });
            };


    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function () {
        var i;
        for (i=0; i<$scope.game.players.length; i++) {
            var to_player = $scope.game.players[i];
            var data = {};
            for (var fi=0; fi<$scope.feedbackOptions.length; fi++) {
                if (to_player.hasOwnProperty($scope.feedbackOptions[fi].name) && to_player[$scope.feedbackOptions[fi].name]) {
                    data[$scope.feedbackOptions[fi].name] = 1;
                }
            }
            if (Object.keys(data).length > 0) {
                $http.post("api/users/" + Auth.getCurrentUser()._id + "/feedback/" + to_player._id, {"feedback": data});
                to_player.feedbackSend = true;
                to_player.showFeedback = false;
            }
        }
        //$scope.saveDialog();
    };
}

//
function FeedbackDialog($log, $mdDialog, $mdMedia) {

    this.show = function (game) {
        var useFullScreen = true; //($mdMedia("sm") || $mdMedia("xs"));
        $mdDialog.show({
            controller: DialogControllerFeedback,
            locals: {
                game: game
            },
            templateUrl: "components/feedbackDialog/feedbackDialog.html",
            parent: angular.element(document.body),
            //targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
        });
    };

}


angular.module('goaldenAppApp')
    .service('FeedbackDialog', FeedbackDialog);