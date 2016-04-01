'use strict';

angular.module('goaldenAppApp')
  .controller('GroupsCtrl', function ($scope) {
    $scope.aNumber = Math.round(Math.random()*8);
  });
