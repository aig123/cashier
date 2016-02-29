(function(){
    'use strict';
    angular.module(applicationModuleName + '.components')
    .filter('trustToHtml', ['$sce', function($sce){
        return function(input){
            return $sce.trustAsHtml(input);
        }
    }]);
})();