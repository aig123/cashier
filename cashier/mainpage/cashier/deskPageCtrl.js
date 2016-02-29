(function () {
    'use strict';
    angular.module(applicationModuleName).controller('deskPageCtrl', ['$scope', '$log', 'indexService', '$location','$stateParams', function ($scope, $log, indexService, $location,$stateParams) {

        var deskId = $stateParams.id;
        console.log("id-----",deskId);

    }]);
})();