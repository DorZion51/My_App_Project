angular.module('MyApp', )
    .controller('registerController', ['$scope','$http','$location',function($scope,$http,$location) {


        self = this;
        var url="http://localhost:3000";


        $scope.countriesXML;
        $http.get(url+"/readXml").then(function (res) {
            $scope.countriesXML=res.data;
        });




        $scope.category1=0;
        $scope.category2=0;
        $scope.category3=0;
        $scope.category4=0;

        $scope.Help=function () {

            if(document.querySelector('#category1').value=="fun"){
                $scope.category1=1;
            }
            if(document.querySelector('#category2').value=="fun"){
                $scope.category2=1;
            }
            if(document.querySelector('#category3').value=="fun"){
                $scope.category3=1;
            }
            if(document.querySelector('#category4').value=="fun"){
                $scope.category2=1;
            }

            if(document.querySelector('#category1').value=="bars"){
                $scope.category1=2;
            }
            if(document.querySelector('#category2').value=="bars"){
                $scope.category2=2;
            }
            if(document.querySelector('#category3').value=="bars"){
                $scope.category3=2;
            }
            if(document.querySelector('#category4').value=="bars"){
                $scope.category4=2;
            }

            if(document.querySelector('#category1').value=="food"){
                $scope.category1=3;
            }
            if(document.querySelector('#category2').value=="food"){
                $scope.category2=3;
            }
            if(document.querySelector('#category3').value=="food"){
                $scope.category3=3;
            }
            if(document.querySelector('#category4').value=="food"){
                $scope.category4=3;
            }
            if(document.querySelector('#category1').value=="visit"){
                $scope.category1=4;
            }
            if(document.querySelector('#category2').value=="visit"){
                $scope.category2=4;
            }
            if(document.querySelector('#category3').value=="visit"){
                $scope.category3=4;
            }
            if(document.querySelector('#category4').value=="visit"){
                $scope.category4=4;
            }
            if(document.querySelector('#category1').value==""){
                $scope.category1=0;
            }
            if(document.querySelector('#category2').value==""){
                $scope.category2=0;
            }
            if(document.querySelector('#category3').value==""){
                $scope.category3=0;
            }
            if(document.querySelector('#category4').value==""){
                $scope.category4=0;
            }
        }


        $scope.Register = function () {
            var arrcat=[];
            for (let i = 1; i < 5; i++) {
                if(document.getElementById("category"+i).value!=""){
                    arrcat.push(document.getElementById("category"+i).value);
                }
            }
            $http.post(url+"/users/Register",
                { Username: $scope.userName, Password: $scope.password,Firstname: $scope.firstname,
                    Lastname: $scope.lastname, City: $scope.city,Country: document.getElementById("Country").value ,Email: $scope.email,
                    Category: arrcat, Answer1: $scope.answer1, Answer2: $scope.answer2}
                ).then(function (res) {
                alert(res.data);
                $location.path("/login");
            });
        }

        //1=fun 2=bars 3=food visit=4



    }]);
