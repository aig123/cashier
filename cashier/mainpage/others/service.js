(function(){
    'use strict';
    angular.module(applicationModuleName).factory('indexService', ['templateResource', 'apis', function(templateResource, apis){
        return {
            save: function ( paramUrl, paramData, callback )
            {
                return templateResource.post( apis.index_save.url + "json", paramUrl, paramData, callback );
            },
            getModule: function ( paramData, callback )
            {
                return templateResource.get( apis.index_save.url + "getJson", paramData, callback );
            },
            get: function ( paramUrl, callback )
            {
                return templateResource.get( apis.index_save.url, paramUrl, callback );
            },
            query: function(param, callback){
                return templateResource.query(apis.index_save.url, param, callback);
            }
        }
    }]);    
})();