'use strict';

angular.module('goaldenAppApp')
  .controller('MainCtrl', function ($scope, $http, $mdMedia, $mdDialog, socket, Auth, Game, GroupDialog, FeedbackDialog, NewGameDialog) {
    
    $scope.showGroupDialog = GroupDialog.show;
    $scope.showFeedbackDialog = FeedbackDialog.show;
    $scope.newGameDialog = NewGameDialog.show;
    
    $scope.user = Auth.getCurrentUser();

    $http.get("/api/games").then(function(resp) {
        $scope.games = resp.data.games;
    });
    
    
    
    $scope.joinGame = function(game) {
        game.joined = !game.joined;
        game.players.push($scope.user);
        $http.post("/api/games/" + game._id + "/users/" + $scope.user._id + "/join");
    }
    
  });
