'use strict';

angular.module('goaldenAppApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ngMessages',
  'btford.socket-io',
  'ui.router',
  'ngMaterial',
  'angular.filter'
]).config(function ($mdThemingProvider) {
        // random colors
        //var color1 = themes[Math.floor(Math.random()*themes.length)],
        //    color2 = themes[Math.floor(Math.random()*themes.length)];
        //console.log("Your Design: ", color1, "-", color2);
        $mdThemingProvider.theme("default")
            .primaryPalette("blue-grey", {
                "hue-3": "A100"
            })
            .accentPalette("deep-orange");
    }).config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('altTheme')
            .primaryPalette('light-green', {
                "default": "300",
                "hue-3": "50",
                "hue-1": "900"
            });
    })
    .config(function ($mdIconProvider) {
        $mdIconProvider
            .iconSet('action', '../assets/iconsets/action-icons.svg', 24)
            .iconSet('alert', '../assets/iconsets/alert-icons.svg', 24)
            .iconSet('av', '../assets/iconsets/av-icons.svg', 24)
            .iconSet('communication', '../assets/iconsets/communication-icons.svg', 24)
            .iconSet('content', '../assets/iconsets/content-icons.svg', 24)
            .iconSet('device', '../assets/iconsets/device-icons.svg', 24)
            .iconSet('editor', '../assets/iconsets/editor-icons.svg', 24)
            .iconSet('file', '../assets/iconsets/file-icons.svg', 24)
            .iconSet('hardware', '../assets/iconsets/hardware-icons.svg', 24)
            .iconSet('icons', '../assets/iconsets/icons-icons.svg', 24)
            .iconSet('image', '../assets/iconsets/image-icons.svg', 24)
            .iconSet('maps', '../assets/iconsets/maps-icons.svg', 24)
            .iconSet('navigation', '../assets/iconsets/navigation-icons.svg', 24)
            .iconSet('notification', '../assets/iconsets/notification-icons.svg', 24)
            .iconSet('social', '../assets/iconsets/social-icons.svg', 24)
            .iconSet('toggle', '../assets/iconsets/toggle-icons.svg', 24)
            .iconSet('avatar', '../assets/iconsets/avatar-icons.svg', 128);
    })
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
    })

.factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
        // Add authorization token to headers
        request: function (config) {
            config.headers = config.headers || {};
            if ($cookieStore.get('token')) {
                config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
            }
            return config;
        },

        // Intercept 401s and redirect you to login
        responseError: function (response) {
            if (response.status === 401) {
                $location.path('/login');
                // remove any stale tokens
                $cookieStore.remove('token');
                return $q.reject(response);
            } else {
                return $q.reject(response);
            }
        }
    };
})

.run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
        Auth.isLoggedInAsync(function (loggedIn) {
            if (next.authenticate && !loggedIn) {
                event.preventDefault();
                $location.path('/login');
            }
        });
    });
});