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
    $scope.feedbackOptions = [{
        icon: "fa fa-thumbs-up",
        info: "geat job",
        name: "thumps-up"
    }, {
        icon: "fa fa-smile-o",
        info: "positive attitude",
        name: "smile"
    }, {
        icon: "fa fa-thumbs-up",
        info: "geat job",
        name: "thumps-up"
    }, {
        icon: "fa fa-thumbs-up",
        info: "geat job",
        name: "thumps-up"
    }];

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