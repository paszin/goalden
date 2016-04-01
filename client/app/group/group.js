'use strict';

angular.module('goaldenAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('group', {
        url: '/groups/{id}',
        templateUrl: 'app/group/group.html',
        controller: 'GroupCtrl'
      });
  });