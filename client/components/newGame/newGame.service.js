'use strict';


/*global angular*/
/*jshint nomen: true */



function DialogControllerNewGame($scope, $mdDialog, Game) {
    $scope.game = {};
    
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function () {
        Game.post($scope.game);
    };
}

/**
 * @ngdoc service
 * @name core.Services.
 * @description  Service
 */
function NewGameDialog($log, $mdDialog, $mdMedia) {

    this.show = function () {
        var useFullScreen = true; //($mdMedia("sm") || $mdMedia("xs"));
        $mdDialog.show({
            controller: DialogControllerNewGame,
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
