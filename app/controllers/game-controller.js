'use strict';

myApp.controller("GameController", function($scope, $window, $routeParams, UserFactory, GameFactory, FilterFactory) {

  // sets the user to null so auth has to be validated through isAuthenticated()
  let currentUser = null;


  // sets searchText to equal the result of FilterFactory
  $scope.searchText = FilterFactory;
  

  // authenticates user so data is stored to their account
  UserFactory.isAuthenticated()
  .then( (user) => {
    // console.log("user status", user);
    currentUser = UserFactory.getUser();
  });


  // $scope.formTitle = "Save Game";
  $scope.games = [];
  function getAllUserGames() {
    let gameArr = [];
    let currentUser = UserFactory.getUser();
    GameFactory.getSavedGames(currentUser)
    .then( (savedGames) => {
      // console.log("Saved games", savedGames);
      let gameData = savedGames.data;
      Object.keys(gameData).forEach( (key) => {
        gameData[key].fbid = key;
        gameArr.push(gameData[key]);
      });
      $scope.games = gameArr;
    })
    .catch( (err) => {
      console.log("error", err);
    });
  }
  getAllUserGames();


  $scope.deleteUserGame = (fbid) => {
    // console.log("delete called", fbid);
    GameFactory.deleteUserGame(fbid)
    .then( (data) => {
      // console.log("removed item from userDB", data);
      getAllUserGames();
    });
  };

  $scope.saveUserReview = (game) => {
    // console.log("scope.userReview equals", $scope.userReview);
    game.userReview = $scope.userReview;
    GameFactory.saveEditedReview(game)
    .then( (data) => {
      // console.log("new game data", data);
      $window.location.href = '#!/games/userDatabase';
    });
  };
    getAllUserGames();

  $scope.editGame = (game) => {
    GameFactory.setCurrentGame(game);
    $window.location.href = '#!/games/edit/{{game}}';
  };
    getAllUserGames();

  $scope.game = GameFactory.getCurrentGame();

  $scope.userReview = "";

  $scope.seeReview = (game) => {
    GameFactory.setCurrentGame(game);
    $window.location.href = '#!/games/detail/{{game}}';
  };
  
  $scope.toggle = function () {
    $scope.state = !$scope.state;
  }; 

});


  