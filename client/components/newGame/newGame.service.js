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
        $scope.game.date = moment($scope.game.daydate)
        $scope.game.date.add($scope.game.timehhdate, 'hours').add($scope.game.timemmdate, 'minutes');
        if (!$scope.is_am && $scope.game.timehhdate < 12) {
            $scope.game.date.add(12, 'hours');
        }
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
