'use strict';

angular.module('goaldenAppApp')
    .controller('ProfileCtrl', function ($scope, $mdToast, $mdDialog, $location, User) {
            $scope.imgUrl = 'https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png';
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


            $scope.saveDialog = function () {
                $mdDialog.show({
                    controller: function ($scope, $mdDialog) {
                        $scope.cancel = function () {
                            $mdDialog.cancel();
                            $location.path('/dashboard');
                        };
                    },
                    clickOutsideToClose: true,
                    //parent: angular.element('md-content'),
                    template: '<div layout="column" layout-margin layout-align="center center"><div>Saved</div><md-button ng-click="cancel()">ok</md-button>  </div>'
                });
            }


                $scope.save = function () {
                    User.put($scope.profile);
                    $scope.saveDialog();
                }
            });