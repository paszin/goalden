'use strict';

angular.module('goaldenAppApp')
    .controller('SignupCtrl', function ($scope, Auth, $location, $window) {
        $scope.user = {};
        $scope.errors = {};

        $scope.isMentor = $location.search()["mentor"] && $location.search()["code"] === "CA1REB";
        $scope.role = $location.search()["role"];

        $scope.register = function (form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.createUser({
                        name: $scope.user.name,
                        email: $scope.user.email,
                        password: $scope.user.password,
                        is_mentor: $scope.isMentor,
                        role: $scope.role || "user"
                    })
                    .then(function () {
                        // Account created, redirect to home
                        $location.path('/profile');
                        $location.search('new', 1);
                    })
                    .catch(function (err) {
                        err = err.data;
                        $scope.errors = {};

                        // Update validity of form fields that match the mongoose errors
                        angular.forEach(err.errors, function (error, field) {
                            form[field].$setValidity('mongoose', false);
                            $scope.errors[field] = error.message;
                        });
                    });
            }
        };

        $scope.loginOauth = function (provider) {
            $window.location.href = '/auth/' + provider;
        };
    });