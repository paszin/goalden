'use strict';

angular.module('goaldenAppApp')
  .controller('GroupsCtrl', function ($scope, Auth) {
    $scope.aNumber = Math.round(Math.random()*8);
    $scope.user = Auth.getCurrentUser();
  });
