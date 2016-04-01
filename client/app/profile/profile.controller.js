'use strict';

angular.module('goaldenAppApp')
    .controller('ProfileCtrl', function ($scope, User) {
        $scope.imgUrl = 'https://pbs.twimg.com/profile_images/651641074373427200/fkGcfovZ.jpg';
    $scope.max_skill_level = 5;
     $scope.positions = ["Goalkeeper", "Defense", "Midfielder", "Forwards", "Left", "Right", "Center"];
    
    $scope.profile = User.get();
    
    
    $scope.save = function() {
        User.put($scope.profile);
    }
    });