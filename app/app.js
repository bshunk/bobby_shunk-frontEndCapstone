'use strict';
// global.mashapeKey = '3e58ec693ab698ba8d25a4aec1f14631';
// const client = igdb('3e58ec693ab698ba8d25a4aec1f14631');
// console.log(client);

let myApp = angular.module("MyApp", ["ngRoute"])
.constant("FirebaseUrl", "https://bobbys-frontend-capstone.firebaseio.com");

let isAuth = (UserFactory) => {
  return new Promise( (resolve,reject) => {
    UserFactory.isAuthenticated()
    .then( (userBoolean) => {
      if(userBoolean)
        resolve();
      else
        reject();
    });
  });
};

// client.games({
//     fields: '*', // Return all fields
//     limit: 5, // Limit to 5 results
//     offset: 15 // Index offset for results
// }).then(response => {
//     // response.body contains the parsed JSON response to this query
// }).catch(error => {
//     throw error;
// });
// console.log("client", client);



