'use strict';

myApp.controller("UserGameController", function($scope, $window, UserFactory, GameFactory) {

  // sets the user to null so auth has to be validated through isAuthenticated()
  let currentUser = null;

  // authenticates user so data is stored to their account
  UserFactory.isAuthenticated()
  .then( (user) => {
    console.log("user status", user);
    currentUser = UserFactory.getUser();
    fetchGames();
  });

  // sets searchText to equal the result of FilterFactory
  // $scope.searchText = FilterFactory;

  // for viewing all game items and saving a game from user DB
  function fetchGames() {
    let gameArr = [];
    console.log("Fetch called");
    GameFactory.getSavedGames(currentUser)
    .then( (savedGames) => {
      console.log("saved games data", savedGames);
      let gameData = savedGames.data;
      Object.keys(savedGames).forEach( (key) => {
        gameData[key].id = key;
        gameArr.push(gameData[key]);
      });
      $scope.games = gameArr;
    })
    .catch( (err) => {
      console.log("error!", err);
    });
  }

  // deletes save game from user database
  $scope.deleteGame = (gameId) => {
    console.log("delete called", gameId);
    GameFactory.deleteGame(gameId)
    .then( (data) => {
      console.log("removed item from userDB", data);
      fetchGames(currentUser);
    });
  };

  $scope.updateGameReview = (gameItem) => {
    console.log("update game review");
    GameFactory.updateGameReview(gameItem)
    .then( (data) => {
      console.log("updated review complete");
    });
  };

});
