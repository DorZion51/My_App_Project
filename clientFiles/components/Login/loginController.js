 angular.module('MyApp')
 .controller('loginController', ['$scope','$http','$location','localStorageService',function($scope,$http,$location,localStorageService) {
 

    self = this;

     var url="http://localhost:3000";
    /* var localStorageService = $scope.$parent.StorageService;
     $scope.addLocalStorage = function (key, value) {
         var dataVal = localStorageService.get(key);
         console.log(dataVal)
         if (!dataVal) {
             if (localStorageService.set(key, value)) {
                 console.log("data added");
             }
             else
                 console.log('failed to add the data');
         }
     }



     $scope.getLocalStorage= function (key)
     {
         return  localStorageService.get(key)
     }

     $scope.updateLocalStorage = function (key,value)
     {
         localStorageService.remove(key);
         localStorageService.set(key,value);
     }
*/
    $scope.forgotPass=0;
     $scope.Login = function () {

         $http.post(url+"/users/Login",
             { Username: $scope.userName, Password: $scope.password }).then(
             function (res) {

                if(res.data.message) {
                    //$scope.addLocalStorage('token', res.data.token);
                    //$scope.$parent.tokenExists = 2;
                    $http.defaults.headers.common['x-access-token'] = res.data.token;
                    $scope.$parent.ctrl.status=1;
                    $scope.$parent.$root.name=$scope.userName;
                    localStorageService.add('token',res.data.token);
                    localStorageService.add('username',$scope.userName);
                    $location.path("/acoountsPoints");
                }
                else{
                    alert(res.data);
                }
             });

     }

     $scope.Recover = function () {
         $http.post(url+"/users/GetPassword",
             { Username: $scope.userName1, Answer1: $scope.answer1, Answer2: $scope.answer2}
         ).then(function (res) {
             alert("your password is: "+res.data.password);
         });
     }

     $scope.Forgot=function(){
         $scope.forgotPass=1;
     }

     $scope.Show = function () {
         $http.get(url + "/POI/Display3RandomPopPoints", {Rank: $scope.rank}).then(function (res) {
             $scope.arr = res.data;
             var e = angular.element(document.querySelector('#points'));

         });
     }

     $scope.Change=function(){
         $location.path("/register");
     }

    $scope.Show();
    




 }]);

