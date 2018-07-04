angular.module('MyApp')
    .controller('poi2Controller', ['$scope','$http','$location','localStorageService',function($scope,$http,$location,localStorageService) {


        self = this;




        var url="http://localhost:3000";

        $scope.getPoints = function () {
            $http.get(url + "/POI/getPoints", {}).then(function (res) {
                $scope.arrall = res.data;


            });
        }

        $scope.getPoints();
        $scope.sortColumn="";



    }]);


