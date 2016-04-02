'use strict';


/*global angular*/
/*jshint nomen: true */



function DialogController($scope, $mdDialog, game) {
    $scope.game = game;
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

    this.show = function (game) {
        var useFullScreen = ($mdMedia("sm") || $mdMedia("xs"));
        $mdDialog.show({
            controller: DialogController,
            locals: {
                game: game
            },
            templateUrl: "components/groupDialog/groupDialog.html",
            parent: angular.element(document.body),
            //targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
        });
    };

}


angular.module('goaldenAppApp')
  .service('GroupDialog', GroupDialog);
