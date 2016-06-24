// console.log("Hello from script.js");
var myApp = angular.module( 'myApp', [] );

myApp.controller( 'assignmentController', [ '$scope', '$http', function( $scope, $http ){
  timer();

  function timer() {
    setTimeout(function() {
      timer();

      $http({
      method: "GET",
      url: "/allAssignments/all",
      }).then(function successCallback(response) {
        // console.log(response);
        $scope.newList = response.data;
        console.log($scope.newList);
      }, function errorCallback(response) {
        console.log(response);
      });

      if ( $scope.newList.length > $scope.assignments.length) {
        $scope.assignments = $scope.newList;
      }
      console.log('5 secs');
    }, 5000);
  }

    $http({
    method: "GET",
    url: "/allAssignments/all",
    }).then(function successCallback(response) {
      console.log(response);
      $scope.assignments = response.data;
    }, function errorCallback(response) {
      console.log(response);
    });

  $scope.newAssignment = function() {
    var submitAssignment = {
      "assignment_number": $scope.assignNumber,
      "student_name": $scope.studentName,
      "score": $scope.score
    };

    $http({
      method: "POST",
      url: "/createAssignment",
      headers: {
        'Content-Type': 'application/json'
      },
      data: submitAssignment,
    }).then( function mySuccess ( response ){
      console.log("success YIPPPEE");
    });
  }; // End getUserInput function
}]);  // $scope is dependency injection //how to bind script to html? $scope.modelname
