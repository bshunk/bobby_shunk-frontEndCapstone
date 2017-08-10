'use strict';

let myApp = angular.module("MyApp", ["ngRoute", "ngSanitize"])
.constant("FirebaseUrl", "https://bobbys-frontend-capstone.firebaseio.com/")
.constant("APIUrl", "http://www.giantbomb.com/api/search?api_key=");

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
  .when('/games/home', {
    templateUrl: 'partials/home.html',
    controller: 'HomeController',
    resolve: {isAuth}
  })
  .when('/games/userDatabase', {
    templateUrl: 'partials/user-games.html',
    controller: 'GameController',
    resolve: {isAuth}
  })
  .when('/games/detail/:gameData', { // anything after the colon will tell angular to save it as a property on routeParams, here as 'todoId' 
    templateUrl: 'partials/game-detail.html',
    controller: 'GameController',
    resolve: {isAuth}
  })
  .when('/games/edit/:gameData', {
    templateUrl: 'partials/game-form.html',
    controller: 'GameController',
    resolve: {isAuth}
  })
  .otherwise('/');
});
