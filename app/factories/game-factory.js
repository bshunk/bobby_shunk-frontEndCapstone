'use strict';

myApp.factory("GameFactory", function($q, $http, FirebaseUrl, APICreds, APIUrl) {

  let getGamesFromDatabase = (searchParameters) => {
    console.log("searchParameters?", searchParameters);
    return $q( (resolve, reject) => {
      $http.get(`${APIUrl}${APICreds.key}&format=json&query="${searchParameters}"&resources=game`)
      .then( (gameData) => {
        resolve(gameData);
      })
      .catch( (err) => {
        console.log("oops", err);
        reject(err);
      });
    });
  };

  return{ getGamesFromDatabase };
});


// // Simple GET request example:
// $http({
//   method: 'GET',
//   url: '/someUrl'
// }).then(function successCallback(response) {
//     // this callback will be called asynchronously
//     // when the response is available
//   }, function errorCallback(response) {
//     // called asynchronously if an error occurs
//     // or server returns response with an error status.
//   });



//   let getTodoList = (userId) => {
//     console.log("userId", userId);
//     return $q( (resolve, reject) => {
//       $http.get(`${FirebaseUrl}todos.json?orderBy="uid"&equalTo="${userId}"`)
//       .then( (todoData) => {
//         resolve(todoData);
//       })
//       .catch( (err) => {
//         console.log("oops", err);
//         reject(err);
//       });
//     });
//   };

// });

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
