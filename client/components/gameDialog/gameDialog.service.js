'use strict';


/*global angular*/
/*jshint nomen: true */



function GameDialogController($scope, $mdDialog, $http, game, User) {
    $scope.game = game;
    
    $scope.imgUrl = 'https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png';
    
    $scope.showPersonDetails = function (person) {
        
        person.showMore =! person.showMore;
        
        User.getById({id: person._id}, 
                     function(data) {
                        person.profile = data;
                    }
                );
    };
    
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
 * @description  ServiceshowPersonDetails()
 */
function GameDialog($log, $mdDialog, $mdMedia) {

    this.show = function (game) {
        
        var useFullScreen = true //($mdMedia("sm") || $mdMedia("xs"));
        $mdDialog.show({
            controller: GameDialogController,
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
