app.factory('Data', ['$http', 
    function ($http ) { // This service connects to our REST API

        var serviceBase = 'api/v1/';

        var obj = {};
       
        obj.post = function (q, object) {
            console.log("Inside Data Factory");
            console.log("url : " +  serviceBase+q);
            console.log("data : " + object);
            
            return $http.post(serviceBase + q, object).then(function (results) {
                console.log("Results In Data Service :" + results.data);
                return results.data;
            });
        };
        

        return obj;
}]);
