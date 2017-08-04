"use strict";

let myApp = angular.module("MyApp", ["ngRoute"])
.constant("FirebaseUrl", "https://api-2445582011268.apicast.io/");

let isAuth = (UserFactory) => {
  return new Promise( (resolve, reject) => {
    UserFactory.isAuthenticated()
    .then( (userBoolean) => {
      if(userBoolean) 
        resolve(); 
      else
        reject();
    });
  });
};


