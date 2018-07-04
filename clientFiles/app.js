let app = angular.module('MyApp', ["ngRoute",'LocalStorageModule']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)  {


    $locationProvider.hashPrefix('');


    $routeProvider.when('/', {
        template: '<h1 style="color:yellow;display: block;margin-left: 450px; margin-right: auto;margin-top: auto; width: 50%;"><b>Welcome to Phara-dise :-)</b></h1>'
    })
        .when('/about', {
            templateUrl: 'components/About/about.html',
            controller : 'aboutController as abtCtrl'
        })
        .when('/favoritepoints', {
            templateUrl: 'components/Favoritepoints/favoritepoints.html',
            controller : 'favoritepointsController as abtCtrl'
        })
        .when('/login', {
            templateUrl: 'components/Login/login.html',
            controller : 'loginController as abtCtrl'
        })
        .when('/register', {
            templateUrl: 'components/Register/register.html',
            controller : 'registerController as abtCtrl'
        })
        .when('/acoountsPoints',{
            templateUrl: 'components/AccountsPoint/accountspoint.html',
            controller : 'accountspointController as abtCtrl'
        })
        .when('/poi',{
            templateUrl: 'components/Poi/poi.html',
            controller : 'poiController as abtCtrl'
        })
        .when('/poi2',{
            templateUrl: 'components/Poi2/poi2.html',
            controller : 'poi2Controller as abtCtrl'
        })
        .otherwise({ redirectTo: '/' });
}]);