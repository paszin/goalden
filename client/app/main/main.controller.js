'use strict';

angular.module('goaldenAppApp')
    .controller('MainCtrl', function ($scope, $http, $mdMedia, $mdDialog, socket, Auth, User, Game, GroupDialog, FeedbackDialog, NewGameDialog) {

        $scope.showGroupDialog = GroupDialog.show;
        $scope.showFeedbackDialog = FeedbackDialog.show;
        $scope.newGameDialog = NewGameDialog.show;

        //$scope.user = Auth.getCurrentUser();
        $scope.user = User.get();
        //Auth.getCurrentUser().then(function(data) {debugger});
        //debugger;

        $http.get("/api/users/me").then(function (resp) {
            $scope.id = resp.data._id;
            $http.get("/api/games/users/" + $scope.user._id).then(function (resp) {
                $scope.games = resp.data.upcoming;
                $scope.passed = resp.data.passed;
            });
        });

        $scope.joinGame = function (game) {
            game.joined = !game.joined;
            game.players.push($scope.user);
            $http.post("/api/games/" + game._id + "/users/" + $scope.user._id + "/join");
        }

    });