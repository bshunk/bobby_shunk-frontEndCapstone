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

  let getSavedGames = (savedGamed) => {
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}games.json`)
      .then( (games) => {
        resolve(games);
      })
      .catch( (err) => {
        console.log("error", err);
        reject(err);
      });
    });
  };

  return{ getGamesFromDatabase, postNewGame, getSavedGames };
});

//   let postNewItem = (newItem) => {
//     return $q( (resolve, reject) => {
//       $http.post(`${FirebaseUrl}todos.json`,
//         angular.toJson(newItem))
//       .then( (newItemData) => {
//         resolve(newItemData);
//       })
//       .catch( (err) => {
//         reject(err);
//       });
//     });
//   };

//   let updateTodoStatus = (todo) => {
//     return $q( (resolve, reject) => {
//       let itemId = todo.id;
//       // PUT the entire obj to FB
//       if (itemId) {
//         $http.put(`${FirebaseUrl}todos/${itemId}.json`,
//           angular.toJson(todo))
//         .then( (data) => {
//           resolve(data);
//         })
//         .catch( (err) => {
//           reject(err);
//         });
//       } else {
//         console.log("I'm burned out for the day. Go home");
//       }
//     });
//   };

//   let deleteTodoItem = (todoId) => {
//     return $q( (resolve, reject) => {
//       if (todoId) {
//         $http.delete(`${FirebaseUrl}todos/${todoId}.json`)
//         .then( (data) => {
//           resolve(data);
//         })
//         .catch( (err) => {
//           reject(err);
//         });
//       } else {
//         console.log("No id passed in");
//       }
//     });
//   };

//   let getSingleTodoItem = (itemId) => {
//     return $q( (resolve, reject) => {
//       $http.get(`${FirebaseUrl}todos/${itemId}.json`)
//       .then( (todo) => {
//         resolve(todo.data);
//       })
//       .catch( (err) => {
//         reject(err);
//       });
//     });
//   };

//   return { getTodoList, postNewItem, deleteTodoItem, updateTodoStatus, getSingleTodoItem };
// });
