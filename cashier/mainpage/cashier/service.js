(function(){
    'use strict';
    angular.module(applicationModuleName).factory('indexService', ['templateResource', 'apis', function(templateResource, apis){
        return {
            getlistLeftPage: function ( paramData, callback )
            {
                return templateResource.get( apis.test_server.url+"datas/package.json" , paramData, callback );
            },
            getlistDesk: function ( paramData, callback )
            {
                return templateResource.get( apis.test_server.url+"datas/list_desk.json" , paramData, callback );
            },
            getlistDesk2: function ( paramData, callback )
            {
                return templateResource.get( apis.test_server.url+"datas/list_desk2.json" , paramData, callback );
            },
            query: function(param, callback){
                return templateResource.query(apis.index_save.url, param, callback);
            }
        }
    }]);    
})();