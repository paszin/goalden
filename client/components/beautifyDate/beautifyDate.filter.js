'use strict';

angular.module('goaldenAppApp')
    .filter("beautifyDate", [

        function () {
            "use strict";
            return function (date) {
                if (date === void 0) {
                    return void 0;
                }
                return moment(date).format("MM/DD") + " ("  + moment(date).fromNow() + ")";
            };
        }
    ]);