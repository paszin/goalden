'use strict';



function DialogControllerFeedback($scope, $mdDialog, track_id) {
    $scope.track_id = track_id;
    $scope.roles = ["Mentors", "Players"];
    $scope.persons = [{
        name: "Mike Meiker"
    }, {
        name: "Thomas Muller"
    }, {
        name: "Michael Ballack",
        showFeedback: true
    }];
    $scope.imgUrl = '/assets/images/person_placeholder.png';
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


    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function () {};
}

//
function FeedbackDialog($log, $mdDialog, $mdMedia) {

    this.show = function (track_id) {
        var useFullScreen = ($mdMedia("sm") || $mdMedia("xs"));
        $mdDialog.show({
            controller: DialogControllerFeedback,
            locals: {
                track_id: track_id
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