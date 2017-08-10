'use strict';

myApp.controller("NavController", function($scope, $window, UserFactory) {

  // sets searchText to equal the results of filter factory
  // $scope.searchText = FilterFactory;
  $scope.isLoggedIn = false;
  // console.log("$scope.isLoggedIn ??", $scope.isLoggedIn);
  // listen for changes to auth state. If logged in, change isLoggedIn to true so the search input, userDB btn, and logout show
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $scope.isLoggedIn = true;
      // console.log("currentUser logged in?", user.uid);
      // console.log("logged in t-f", $scope.isLoggedIn);
      
      // $apply tells angular to apply whatever change to scope is needed on it's own, manually.
      $scope.$apply(); 
    } else {
      $scope.isLoggedIn = false;
      // $apply tells angular to apply whatever change to scope is needed on it's own, manually.
      $scope.$apply();
      // console.log("user logged in?", $scope.isLoggedIn);
      $window.location.href = "#!/";
    }
  });

  $scope.logout = () => {
    // console.log("logout clicked");
    UserFactory.logoutUser();
  };

});
