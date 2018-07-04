angular.module('MyApp')
    .controller('accountspointController', ['$scope','$http','$location',function($scope,$http,$location) {


        self = this;
        var url="http://localhost:3000";

        $scope.$parent.$root.numberOfItems= "'"+$scope.$parent.GetCounter()+"'";

        $scope.Gat2Last = function () {
            $http.get(url+"/POI/accounts/Get2LastPointSaved",{}).then(function (res) {

                if(res.data.length==0){
                    document.getElementById("alert").innerText="you dont have any saved points!";
                }
                else{
                    $scope.arr2Last=res.data;

                }
            });
        }
        $scope.Gat2Last();
        $scope.GetRecommended = function () {
            $http.get(url+"/POI/accounts/GetRecommendPoint",{Category: $scope.category}).then(function (res) {
                $scope.arr2Rec=res.data;
            });
        }
        $scope.GetRecommended();
    }]);

