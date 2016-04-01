'use strict';

angular.module('goaldenAppApp')
    .controller('ProfileCtrl', function ($scope) {
        $scope.imgUrl = 'https://pbs.twimg.com/profile_images/651641074373427200/fkGcfovZ.jpg';
    $scope.max_skill_level = 5;
        $scope.profile = {
            name: "Genki",
            skill_level: 3,
            age: 19,
            zip_code: 94340,
            introduction: "I am Genki, love sports, work in a bike shop and i'm interested in EDM Festivals",
            equipment: ["ball", "shoes"],
            position: "MDF",
            timetable: {
                monday: true,
                tuesday: true,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: true,
                sunday: false
            }
        };
    $scope.positions = ["Goalkeeper", "Defense", "Midfielder", "Forwards", "Left", "Right", "Center"];
    });