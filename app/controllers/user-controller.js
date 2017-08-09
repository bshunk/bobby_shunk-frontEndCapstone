'use strict';

myApp.controller("UserController", function($scope, $window, UserFactory) {

  $scope.account = {
    email: "",
    password: "",
  };

  $scope.register = () => {
    // TODO validate that user doesn't exist so they'll be taken to login
    // console.log("you clicked register");
    UserFactory.createUser($scope.account)
    .then( (userData) => {
      // console.log("New User!", userData);
      $scope.login();
    });
  };

  $scope.login = () => {
    UserFactory.loginUser($scope.account)
    .then( (userData) => {
      // console.log("user data", userData);
      $window.location.href = '#!/games/home';
    });
  };

});
