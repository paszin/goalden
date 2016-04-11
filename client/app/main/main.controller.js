'use strict';

angular.module('goaldenAppApp')
    .controller('MainCtrl', function ($scope, $http, $mdMedia, $mdDialog, socket, Auth, User, Game, GameDialog, FeedbackDialog, NewGameDialog) {

        $scope.showGameDialog = GameDialog.show;
        $scope.showFeedbackDialog = FeedbackDialog.show;
        $scope.newGameDialog = NewGameDialog.show;


        //$scope.user = Auth.getCurrentUser();
        $scope.user = User.get();
        //Auth.getCurrentUser().then(function(data) {debugger});
        //debugger;

        $scope.refresh = function () {
            $http.get("/api/users/me").then(function (resp) {
                $scope.id = resp.data._id;
                $http.get("/api/games/users/" + $scope.user._id).then(function (resp) {
                    $scope.games = resp.data.upcoming;
                    $scope.passed = resp.data.passed;
                });
            });

        };



        $scope.joinGame = function (game) {
            game.joined = !game.joined;
            if (game.joined) {
                if ($scope.user.is_mentor) {
                    game.mentors.push($scope.user);
                } else {
                    game.players.push($scope.user);
                }

                $http.post("/api/games/" + game._id + "/users/" + $scope.user._id + "/join");
            } else {
                if ($scope.user.is_mentor) {
                    game.mentors = _.reject($scope.games.mentors, {
                        "_id": $scope.user._id
                    });
                } else {
                    game.players = _.reject($scope.games.players, {
                        "_id": $scope.user._id
                    });
                }

                $http.post("/api/games/" + game._id + "/users/" + $scope.user._id + "/leave");
            }
        };

        $scope.refresh();

    });