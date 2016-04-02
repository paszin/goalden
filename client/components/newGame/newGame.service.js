'use strict';


/*global angular*/
/*jshint nomen: true */



function DialogControllerNewGame($scope, $mdDialog, track_id) {
    $scope.track_id = track_id;
    
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
function NewGameDialog($log, $mdDialog, $mdMedia) {

    this.show = function (track_id) {
        var useFullScreen = ($mdMedia("sm") || $mdMedia("xs"));
        $mdDialog.show({
            controller: DialogControllerNewGame,
            locals: {
                track_id: track_id
            },
            templateUrl: "components/newGame/newGameDialog.html",
            parent: angular.element(document.body),
            //targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
        });
    };

}


angular.module('goaldenAppApp')
  .service('NewGameDialog', NewGameDialog);
