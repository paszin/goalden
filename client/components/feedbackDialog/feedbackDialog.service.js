'use strict';



function DialogController($scope, $mdDialog, track_id) {
    $scope.track_id = track_id;
    $scope.persons = [{name: "Mike Meiker"}, {name: "Thomas Muller"}, {name: "Michael Ballack"}];
    
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function () {
    };
}

/**
 * @ngdoc service
 * @name core.Services.
 * @description  Service
 */
function GroupDialog($log, $mdDialog, $mdMedia) {

    this.show = function (track_id) {
        var useFullScreen = ($mdMedia("sm") || $mdMedia("xs"));
        $mdDialog.show({
            controller: DialogController,
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
  .service('FeedbackDialog', GroupDialog);
