angular.module('MyApp')
    .controller('favoritepointsController', ['$scope','$http','$location',function($scope,$http,$location) {


        self = this;
        $scope.sortColumn="";

        var url="http://localhost:3000";

        $scope.Show = function () {
            $http.get(url+"/POI/accounts/getIntrestingPointsOfUser",{}).then(function (res) {
                var arr=res.data;
                $scope.arrfa=new Array();
                for (let i = arr.length-1; i >=0 ; i--) {
                    $scope.arrfa.push(arr[i]);
                }
            });
        }
        $scope.Show();

        $scope.Remove=function (id) {
            $http.delete(url+"/POI/accounts/DeletePointFromFavoriteList",{params:{PointID: id}}).then(function (res) {
                $scope.$parent.$root.numberOfItems = "'" + $scope.$parent.GetCounter() + "'";
                $scope.Show();
            });

        }

        $scope.Save=function () {
            var arr=new Array();
            for (let i = 0; i <$scope.arrfa.length ; i++) {
                var pid=document.getElementById("pid"+i);
                var a=document.getElementById(pid.innerText);
                arr.push({pid: pid.innerText.trim(),mysort:a.value});
            }
            $http.put(url+"/POI/accounts/setMySort",{Arr: arr}).then(function (res) {
                alert(res.data);
                $scope.Show();
            });
        }


    }]);

