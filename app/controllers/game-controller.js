'use strict';

myApp.controller("GameController", function($scope, $window, $routeParams, UserFactory, GameFactory, FilterFactory) {

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

  // // controller working with game details
  // GameFactory.getSingleGameItem($routeParams.gameId)
  // .then( (game) => {
  //   console.log("todo item", game);
  //   $scope.selectedItem = game;
  // })
  // .catch( (err) => {
  //   console.log("error! No item returned", err );
  // });

  // $scope.loadEditForm = (selectedGameId) => {
  //   $window.location.href = `#!/games/edit/${selectedGameId}`;
  // };

  $scope.deleteGame = (gameData) => {
    console.log("delete called", gameData);
    GameFactory.deleteGame(gameData)
    .then( (data) => {
      console.log("removed item from userDB", data);
      getAllUserGames(currentUser);
    });
  };

});


  