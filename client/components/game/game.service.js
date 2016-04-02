'use strict';

angular.module('goaldenAppApp')
    .factory('Game', function ($resource) {

        return $resource('/api/games/:id/:controller', {
            id: '@_id'
        }, {
            getAll: {
                method: 'GET'
            }
        });
    });

