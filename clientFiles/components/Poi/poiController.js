angular.module('MyApp')
    .controller('poiController', ['$scope','$http','$location','localStorageService',function($scope,$http,$location,localStorageService) {


        self = this;




        var url="http://localhost:3000";
        $scope.$parent.$root.numberOfItems= "'"+$scope.$parent.GetCounter()+"'";
        $scope.getPoints = function () {
            $http.get(url + "/POI/getPoints", {}).then(function (res) {
                $scope.arrall = res.data;


            });
        }

        $scope.getPoints();
        $scope.sortColumn="";


        $scope.addFavorite=function (star_id) {
            var img=document.getElementById('star'+star_id);
            var pid=document.getElementById(star_id);
            //get in black->yellow

            localStorageService.add('points'+star_id,pid.innerText);

        }

        $scope.deleteFavorite=function(star_id){
            var img=document.getElementById('star'+star_id);
            var pid=document.getElementById(star_id);
            localStorageService.remove('points'+star_id);

        }

        $scope.AddToDB=function(){
            $http.delete(url+"/POI/accounts/DeleteAll",{}).then(function (res) {
                $scope.$parent.$root.numberOfItems = "'" + $scope.$parent.GetCounter() + "'";
                angular.forEach(localStorageService.keys(),function (k) {
                    if(k.includes('points')) {
                        $http.put(url + "/POI/accounts/AddPointToFavoriteList", {PointID: localStorageService.get(k)}).then(function (res) {
                            $scope.$parent.$root.numberOfItems = "'" + $scope.$parent.GetCounter() + "'";
                        });
                    }
                });
                alert("success");
            });


        }

        $scope.Check=function (star_id) {
            var x=localStorageService.get('points'+star_id);
            if(x){
                return true;
            }
            return false;
        }

        $scope.Check1=function () {
            return $scope.$parent.ctrl.status==1;
        }


    }]);


