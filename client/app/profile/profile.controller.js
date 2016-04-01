'use strict';

angular.module('goaldenAppApp')
    .controller('ProfileCtrl', function ($scope, User) {
        $scope.imgUrl = 'https://pbs.twimg.com/profile_images/651641074373427200/fkGcfovZ.jpg';
    $scope.max_skill_level = 5;
     $scope.positions = ["Goalkeeper", "Defense", "Midfielder", "Forwards", "Left", "Right", "Center"];
    $scope.languages = ["English", "Japanese", "German"];
    
    $scope.firstLetter = function(string) {
        return string[0];
    };
    
    $scope.updateDay = function(day) {
        day.checked =!day.checked;
    };
    
    $scope.profile = User.get();
    
    
    $scope.save = function() {
        User.put($scope.profile);
    }
    });