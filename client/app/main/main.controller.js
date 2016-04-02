'use strict';

angular.module('goaldenAppApp')
  .controller('MainCtrl', function ($scope, $http, $mdMedia, $mdDialog, socket, Game, GroupDialog, FeedbackDialog, NewGameDialog) {
    
    $scope.showGroupDialog = GroupDialog.show;
    $scope.showFeedbackDialog = FeedbackDialog.show;
    $scope.newGameDialog = NewGameDialog.show;

    $http.get("/api/games").then(function(resp) {
        $scope.games = resp.data.games;
    });
    
  });
