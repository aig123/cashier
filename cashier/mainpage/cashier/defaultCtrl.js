(function () {
    'use strict';
    angular.module(applicationModuleName).controller('default_ctrl', ['$scope', '$log', 'indexService', '$location','$state', function ($scope, $log, indexService, $location,$state) {
        $scope.db = {}     //定义基础数据
        $scope.urlParam = "";//定义url参数
        $scope.filter_list = {};//左侧筛选数据
        $scope.desk_list = {};//右侧餐桌数据
        $scope.currentAreas = {};//左侧 当前区域
        $scope.currentAreas.id=0;//默认为全部
        $scope.getLeftDadas = function () {
            indexService.getlistLeftPage($scope.urlParam, function (datas) {
                $scope.db = datas;
                $scope.filter_list = $scope.db.filter[0].list;
            });
        }
        $scope.getDeskDadas = function () {
            indexService.getlistDesk($scope.urlParam, function (datas) {
                $scope.desk_list = datas.returnValue.desk;
            });
        }
        $scope.getDesk2Dadas = function () {
            indexService.getlistDesk2($scope.urlParam, function (datas) {
                $scope.desk_list = datas.returnValue.desk;
            });
        }

        $scope.areasClick = function (id) {
            $scope.currentAreas.id = id;
            if (id != 0) {
                $scope.getDesk2Dadas();
            }else{
                $scope.getDeskDadas();
            }
        }
        $scope.deskClick = function (id) {
            $state.go('desk', {id: id});
        }

        $scope.getLeftDadas();          //初始化基础数据
        $scope.getDeskDadas();          //初始化右侧餐桌数据


    }]);
})();