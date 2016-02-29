(function(){
    'use strict';
    angular.module(applicationModuleName).directive('dErrors', function(){
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            template: '<div class="top-message"><alert ng-repeat="alert in alerts" type="{{alert.type}}" close="closeAlert($index)">{{alert.msg}}</alert></div>',
            controller: ['$scope', 'errors', function($scope, errors){
                $scope.alerts = errors;
                $scope.closeAlert = function(index) {
                    $scope.alerts.splice(index, 1);
                };
               
            }]
        };
    });
    angular.module(applicationModuleName + '.components')
        .directive('dOpration', ['$parse', '$compile', '$stateParams', '$timeout', function($parse, $compile, $stateParams, $timeout){
            return {
                restrict: 'E',
                templateUrl: 'js/components/opration.html',
                link: function($scope, iElm, iAttrs, controller) {
                    $scope.$on('hw.event.saving.start', function(){
                        $scope.saveMsg = '正在保存数据...';
                    });
                    $scope.$on('hw.event.saving.end', function(){
                        $scope.saveMsg = '数据保存完成.';
                        $timeout(function(){
                            $scope.saveMsg = '';
                        },1000);
                    });
                    if($stateParams.model == 'edit'){
                        $scope.editActive = 'active';
                    } else {
                        $scope.previewActive = 'active';   
                    }
                    return iElm;
                }
            }
        }])

})();