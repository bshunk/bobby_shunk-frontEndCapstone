'use strict';

myApp.factory("GameFactory", function($q, $http, FirebaseUrl, FBCreds, APICreds, APIUrl) {

  let currentGame = {};

  let getCurrentGame = () => {
    return currentGame;
  };

  let setCurrentGame = (game) => {
    currentGame = game;
  };

  let getGamesFromDatabase = (searchParameters) => {
    console.log("searchParameters?", searchParameters.searchTerm);
    return $q( (resolve, reject) => {
      $http.get(`${APIUrl}${APICreds.key}&format=json&query=${searchParameters.searchTerm}&resources=game`)
      .then( (gameData) => {
        console.log("gameData equals= ", gameData);
        resolve(gameData);
      })
      .catch( (err) => {
        console.log("oops", err);
        reject(err);
      });
    });
  };

  let postNewGame = (savedGame) => {
    console.log("savedGame", savedGame);
    return $q( (resolve, reject) => {
      $http.post(`${FirebaseUrl}games.json`,
        angular.toJson(savedGame))
      .then( (savedGameData) => {
        resolve(savedGameData);
      })
      .catch( (err) => {
        reject(err);
      });
    });
  };

  let getSavedGames = (userId) => {
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}games.json?orderBy="uid"&equalTo="${userId}"`)
      // $http.get(`${FirebaseUrl}games.json`)
      .then( (gameData) => {
        resolve(gameData);
      })
      .catch( (err) => {
        console.log("error", err);
        reject(err);
      });
    });
  };

  let deleteUserGame = (fbid) => {
    console.log("game data equals", fbid);
    return $q( (resolve, reject) => {
      if(fbid) {
        $http.delete(`${FirebaseUrl}/games/${fbid}.json`)
        .then( (data) => {
          resolve(data);
        })
        .catch( (err) => {
          reject(err);
        });
      } else {
        console.log("Sorry, we've lost your game");
      }
    });
  };

  let saveEditedReview = (game) => {
    console.log("game equals", game);
    return $q( (resolve, reject) => {
      if(game) {
        $http.patch(`${FirebaseUrl}games/${game.fbid}.json`,
        angular.toJson(game))
        .then( (data) => {
          resolve(data);
        })
        .catch( (err) => {
        reject(err);
        });
      } else {
        console.log("Error can not complete");
      }
    });
  };

  return{ getGamesFromDatabase, postNewGame, getSavedGames, deleteUserGame, saveEditedReview, getCurrentGame, setCurrentGame };
});






