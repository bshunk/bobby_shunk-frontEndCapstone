'use strict';

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

myApp.config( ($routeProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/login.html',
    controller: 'UserController'
  })
  .when('/games/home.html', {
    templateUrl: 'partials/home.html',
    controller: 'GameController',
    resolve: {isAuth}
  })
  .when('/games/userDatabase.html', {
    templateUrl: 'partials/game-form.html',
    controller: 'addGameController',
    resolve: {isAuth}
  })
  .when('/games/detail/:gameId.html', {
    templateUrl: 'partials/game-detail.html',
    controller: 'editGameController',
    resolve: {isAuth}
  })
  .when('/games/edit/:gameId', {
    templateUrl: 'partials/game-form.html',
    controller: 'editGameController',
    resolve: {isAuth}
  })
  .when('/games/review/:gameId', {
    templateUrl: 'partials/game-form.html',
    controller: 'editGameController',
    resolve: {isAuth}
  });
});
