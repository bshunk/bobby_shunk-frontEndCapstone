'use strict';

myApp.controller("GameController", function($scope, $window, UserFactory, GameFactory, FilterFactory) {

  // sets the user to null so auth has to be validated through isAuthenticated()
  let currentUser = null;

  // sets searchText to equal the result of FilterFactory
  $scope.searchText = FilterFactory;
  
  // authenticates user so data is stored to their account
  UserFactory.isAuthenticated()
  .then( (user) => {
    console.log("user status", user);
    currentUser = UserFactory.getUser();
  });
    
  $scope.fetchGames = () => {
    let gameArr = [];
    console.log("Fetch called", $scope.searchText);
    GameFactory.getGamesFromDatabase($scope.searchText)
    .then( (savedGames) => {
      console.log("saved games data", savedGames);
      let gameData = savedGames.data.results;
      gameData.forEach( (results) => {
        console.log("These are the results: ", results);
        // gameData[key].id = key;
        gameArr.push(results);
      });
      $scope.games = gameArr;
    })
    .catch( (err) => {
      console.log("error!", err);
    });
  };

  $scope.saveGameToUser = (game) => {
    console.log("This is game data", game);
    game.uid = currentUser;
    GameFactory.postNewGame(game)
    .then( (data) => {
      console.log("new game data", data);
      $window.location.href = '#!/games/userDatabase';
    });
  };

  // $scope.formTitle = "Save Game";
  $scope.games = [];
  function getAllUserGames() {
    let gameArr = [];
    let currentUser = UserFactory.getUser();
    GameFactory.getSavedGames(currentUser)
    .then( (savedGames) => {
      console.log("Saved games", savedGames);
      let gameData = savedGames.data;
      Object.keys(gameData).forEach( (key) => {
        gameData[key].id = key;
        gameArr.push(gameData[key]);
      });
      $scope.games = gameArr;
    })
    .catch( (err) => {
      console.log("error", err);
    });
  }
  getAllUserGames();


});

  // $scope.getAllUserGames = () => {

  // };

  // $scope.updateGameReview = (gameItem) => {
  //   console.log("update game review");
  //   GameFactory.updateGameReview(gameItem)
  //   .then( (data) => {
  //     console.log("updated review complete");
  //   });
  // };

  // // deletes save game from user database
  // $scope.deleteGame = (gameId) => {
  //   console.log("delete called", gameId);
  //   GameFactory.deleteGame(gameId)
  //   .then( (data) => {
  //     console.log("removed item from userDB", data);
  //     fetchUserGames(currentUser);
  //   });
  // };


