var applicationModuleName = 'web';
(function(){
    'use strict';
    angular.module(applicationModuleName + '.components', []);
    angular.module(applicationModuleName, ['ui.router', 'ngResource', 'ngCookies', applicationModuleName + '.components' ]);
    angular.module(applicationModuleName)
        // 错误消息
        .constant("errors", [])
        // 错误消息
        .constant("apis", {
            test_server: { url: 'http://localhost:1615/cashier/' },   //测试数据服务器
            order_id: ""
        })
        .config( ['$logProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', function ( $logProvider, $locationProvider, $stateProvider, $urlRouterProvider, $httpProvider )
        {
            $logProvider.debugEnabled(true);
            $locationProvider.hashPrefix('!');
            $urlRouterProvider.otherwise('cashier');
            // 模板动态加载
            $stateProvider
                .state('default', {
                    url: '/cashier',
                    templateUrl: function(stateParams){
                        return 'mainpage/cashier/default.html';
                    }
                }) .state('desk', {
                    url: '/desk/:id',
                    templateUrl: 'mainpage/cashier/deskPage.html'
                })
            
        //    $httpProvider.defaults.headers.post = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' };
            //$httpProvider.defaults.transformRequest = function ( obj ) { var str = []; for ( var p in obj ) str.push( encodeURIComponent( p ) + "=" + encodeURIComponent( obj[p] ) ); return str.join( "&" ) };
        }] )
        //错误处理
        .factory('$exceptionHandler', ['$log', 'cmMessage', function($log, cmMessage) {
            return function(exception, cause) {
                if(angular.isString(exception)){
                    cmMessage.error(exception);
                } else {
                    cmMessage.error(exception.message);
                }
                $log.error(exception);
            };   
        }])
        //成功消息处理
        .factory('cmMessage', ['errors', function(errors) { 
            return {
                success: function(message){
                    errors.push( { type: 'success', msg: message } );
                    setTimeout( function ()
                    {
                        errors.splice( 0, 1 );
                    }, 500 );
                },
                warn: function(message){
                    errors.push({ type: 'warning', msg: message});
                },
                info: function(message){
                    errors.push({ type: 'info', msg: message});
                },
                error: function(message){
                    errors.push( { type: 'danger', msg: message } );
                    setTimeout( function ()
                    {
                        errors.splice( 0, 1 );
                    }, 200 );
                },
            }
        }])
        //log处理
        .factory('cmLog', ['$resource', '$log', function($resource, $log) { 
            return {
                error: function(message){
                    $log.error(message);
                }
            }
        }])
        //数据通信
        .factory( 'templateResource', ['$resource', '$http', function ( $resource, $http )
        {
            var _error = function(retVal){
                throw '保存失败';
            }
            return {
                /**
                 * 更新信息
                 */
                //httpPost: function ( url, urlParam, saveParam, callback )
                //{
                //    saveParam = saveParam || {};
                //    $http.post( url + "?orderId=" + urlParam, { saveParam: saveParam } ).success( function ( data, status, headers, config )
                //    {
                //        callback( data );
                //    } ).error( function ()
                //    {
                //      //  $( this ).Alert( { "title": data.message, "str": data.description, "mark": true } );
                //    }
                //   )
                //},

                post: function ( url, parm,saveParam, callback )
                {
                    saveParam = saveParam || {};
                    $resource( url,parm).save( saveParam ).$promise.then( callback, _error );
                },
                /**
                 * 查询信息
                 */
                get : function(url, param, callback) {
                    param = param || {};
                    $resource(url, param).get().$promise.then(callback, _error);
                },
                /**
                 * 查询信息
                 */
                query : function(url, param, callback) {
                    param = param || {};
                    $resource(url, param).query().$promise.then(callback, _error);
                },
            };
        }]);

        // 启动项目
        angular.element(document).ready(function() {
            if (window.location.hash === '#_=_') window.location.hash = '#!';
            angular.bootstrap(document, [applicationModuleName]);
        });
} )();


