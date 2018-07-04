var app1=angular.module('MyApp')
    .controller('myCtrl', ['$scope','$location','$http','localStorageService','$rootScope',function ($scope,$location,$http,localStorageService,$rootScope) {


        self = this;
        var url="http://localhost:3000";
        self.status=0;
        var t=localStorageService.get('token');
        $http.defaults.headers.common['x-access-token']=t;
        if(t){
            self.status=1;
            $rootScope.name=localStorageService.get('username');
        }

        $scope.toFavorite=function () {
            $location.path("/favoritepoints");
            self.status=1;
        }

        $scope.GetCounter = function () {
            $http.get(url+"/users/accounts/GetCounterPointsOfUser",{}).then(function (res) {
                $scope.$root.numberOfItems=res.data.numOfPoints;
                return res.data.numOfPoints;
            },function (err) {
            });
        }
        $scope.popPoint=function (item) {
            document.getElementById('imgClick').src=item.image;
            document.getElementById('title').innerText=item.pointID;
            document.getElementById('cate').innerText=item.category;
            document.getElementById('desc').innerText=item.descreption;
            document.getElementById('rank').innerText=((item.rankAvg/5)*100)+"%";
            document.getElementById('nov').innerText=item.numberOfReview+" views";
            var x=item.pointID;
            $http.get(url+"/POI/getPointInfo",{params:{PointID : x}});
            $http.get(url+"/POI/Get2LastReviewWithDate",{params:{PointID: x}}).then(function (res) {
                document.getElementById('comment1').innerText="First comment: "+res.data[0].comment;
                document.getElementById('comment2').innerText="Second comment: "+res.data[1].comment;
            });
            document.getElementById('id10').style.display='block';
        }
        $scope.popComment=function (item) {
            $scope.pid=item;
            document.getElementById('id11').style.display='block';
        }
        $scope.popRank=function (item) {
            $scope.pid=item;
            document.getElementById('id12').style.display='block';
        }
        $scope.WriteComment=function(){
            var c=document.getElementById('comment').value;
            $http.put(url+"/users/accounts/AddComment",{PointID: $scope.pid, Comment: c}).then(function (res) {
                alert(res.data);
            });
        }
        $scope.WriteRank=function(){
            var r=document.getElementById('ranky').value;
            $http.put(url+"/users/accounts/AddRank",{PointID: $scope.pid, Rank: r}).then(function (res) {
                alert("OK");
            });
        }

    }]);

app1.run(function($rootScope) {
    $rootScope.name = 'guest';
    $rootScope.numberOfItems='0';

});
