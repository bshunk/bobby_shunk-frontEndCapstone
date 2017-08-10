'use strict';

myApp.factory("GameFactory", function($q, $http, FirebaseUrl, FBCreds, APICreds, APIUrl) {

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
      .then( (gameData) => {
        resolve(gameData);
      })
      .catch( (err) => {
        console.log("error", err);
        reject(err);
      });
    });
  };

  let deleteGame = (gameData) => {
    console.log("game data equals", gameData);
    return $q( (resolve, reject) => {
      if(gameData) {
        $http.delete(`${FirebaseUrl}games/${gameData}.json`)
        .then( (data) => {
          resolve(data);
        })
        .catch( (err) => {
          reject(err);
        });
      } else {
        console.log("Sorry, we've lost your fucking game");
      }
    });
  };

  return{ getGamesFromDatabase, postNewGame, getSavedGames, deleteGame };
});






