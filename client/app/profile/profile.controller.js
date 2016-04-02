'use strict';

angular.module('goaldenAppApp')
    .controller('ProfileCtrl', function ($scope, $mdToast, User) {
        $scope.imgUrl = '/assets/images/person.png';
        $scope.max_skill_level = 5;
        $scope.positions = ["Goalkeeper", "Defense", "Midfielder", "Forwards", "Left", "Right", "Center"];
        $scope.languages = ["English", "Japanese", "German"];
        $scope.offers = ["shoes", "socks", "transportation"];


        $scope.firstLetter = function (string) {
            return string[0];
        };

        $scope.updateDay = function (day) {
            day.checked = !day.checked;
        };

        $scope.getStyle = function (day) {
            return {
                "background-color": {
                    true: "light-green",
                    false: "white"
                }[day.checked]
            };
        };

        $scope.profile = User.get();


        $scope.save = function () {
            User.put($scope.profile);
            $mdToast.show(
                $mdToast.simple()
                .textContent('Successfully saved!')
                .position("top")
                .hideDelay(3000)
            );
        }
    });