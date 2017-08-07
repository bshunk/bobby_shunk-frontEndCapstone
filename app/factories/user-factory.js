'use strict';

// setting myApp.factory to equal UserFactory within partial with the anonymous function called expecting $q, $http, FirebaseUrl and FBCreds to be passed in at some point
myApp.factory("UserFactory", function($q, $http, FirebaseUrl, FBCreds) {
  
  // setting config to equal the object containing the firebase key and auth domain
  var config = {
    apiKey: FBCreds.key,
    authDomain: FBCreds.authDomain
  };

  // passes config into initializeApp within firebase
  firebase.initializeApp(config);

  // setting current user to equal null because so when no one is logged in a profile won't display
  let currentUser = null;
  console.log("this is what current user equals", currentUser);

  let isAuthenticated = function() {
    console.log("isAuthenticated called");
    return new Promise( (resolve, reject) => {
      console.log("firing onAuthStateChanged");
      firebase.auth().onAuthStateChanged(function(user) {
        console.log("onAuthStateChanged finished");
        if (user) {
          console.log("user", user);
          currentUser = user.uid;
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };

  let getUser = () => {
    return currentUser;
  };

  let createUser = (userObj) => {
    return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
    .catch( (err) => {
      console.log("error creating user", err.message);
    });
  };

  let loginUser = (userObj) => {
    return $q( (resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
      .then( (user) => {
        // have to set the current user here because the controllers that call `getUser` ( todo-controller, for example) are loading before the `onAuthStateChanged` listener was kicking in and setting the user value
        currentUser = user.uid;
        resolve(user);
      })
      .catch( (err) => {
        console.log("error logging in", err.message);
      });
    });
  };

  let logoutUser = () => {
    return firebase.auth().signOut()
    .catch( (err) => {
      console.log("error logging out", err.message);
    });
  };

  console.log("firebase", firebase);

  return {isAuthenticated, getUser, createUser, loginUser, logoutUser};

});
