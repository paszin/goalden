'use strict';


/*global angular*/
/*jshint nomen: true */



function DialogController($scope, $mdDialog, game) {
    $scope.game = game;
    $scope.imgUrl = '/assets/images/person_placeholder.png';
    /*$scope.game = {Players: [{
        name: "Mike"
    }, {
        name: "Thomas"
    }, {
        name: "Naomi"
    },{
        name: "Yuri"
    },{
        name: "Timur"
    },{
        name: "John",
        showFeedback: false
    }], Mentors: [{
        name: "Omar"
    }, {
        name: "Marie",
        showFeedback: false
    }]};
    */
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
function GameDialog($log, $mdDialog, $mdMedia) {

    this.show = function (game) {
        var useFullScreen = ($mdMedia("sm") || $mdMedia("xs"));
        $mdDialog.show({
            controller: DialogController,
            locals: {
                game: game
            },
            templateUrl: "components/gameDialog/gameDialog.html",
            parent: angular.element(document.body),
            //targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
        });
    };

}


angular.module('goaldenAppApp')
  .service('GameDialog', GameDialog);
