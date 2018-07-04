angular.module('MyApp')
    .controller('CommentController', ['$scope','$http',function($scope,$http) {

        self = this;
        var url="http://localhost:3000";
        $scope.AddComment = function () {
            $http.put(url+"/users/AddComment",{PointID: $scope.pointid1, Comment: $scope.comment}).then(function (res) {
                alert(res.data);
            });
        }

        $scope.DeleteComment = function () {
            $http.delete(url+"/users/DeleteComment",{PointID: $scope.pointid2}).then(function (res) {
                alert(res.data);
            });
        }
    }]);