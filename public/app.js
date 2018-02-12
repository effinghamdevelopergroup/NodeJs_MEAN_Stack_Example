// BEGIN APP - UI
//Main module controller for the app
angular.module('nodeExample', ['ngMaterial'])
.controller('MainController',MainController) 
function MainController ($scope, $mdDialog, $mdToast, $window, $rootScope, $timeout, $filter, $http){
    // Controller functions //
    $scope.name = "";
    $scope.email = "";
    $scope.message = "";

    $scope.submit = function () {
        console.log("In Here");
        var person = {
            Id: '1',
            Date: '02/20/2018',
            Name: $scope.name,
            Email: $scope.email
        }

        $http({
            method: 'POST',
            url: '/api/testData/CreateTestData',
            data: person
        }).then(function successCallback(response) {
            $timeout(function () {
                $scope.$apply(function () {
                    $scope.message = "Login Successful";
                });
            }, 0);
        }, function errorCallback(response) {
            $scope.message = "Login Failed";
        });
    }
};
