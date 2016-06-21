/**
 * Created by Brennan on 6/19/2016.
 */
'use strict';

(function(){
  angular.module('fndParyBoatsApp')
    .factory('dbService', function ($q, util) {
      var rootRef = new Firebase('https://findpartyboat.firebaseio.com/');

      var config = {
        apiKey: "AIzaSyCkDhfBJEjsAG_Ar12ZEO76w1UT-BKpe_s",
        authDomain: "findpartyboat.firebaseapp.com",
        databaseURL: "https://findpartyboat.firebaseio.com",
        storageBucket: "findpartyboat.appspot.com"
      };
      firebase.initializeApp(config);



      function newUser(newU){
        console.log("new user", rootRef.auth);
        //var user = $q.defer();

        return firebase.auth().createUserWithEmailAndPassword(newU.email, newU.password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log('ERROR: ',error.message);
        });



      }

      function test(){
        rootRef.child('test').push({hello:'Hello'})
      }



      function forgotPassword(email){
        user = firebase.auth().sendPasswordResetEmail(email).then(function() {
          // Email sent.
        }, function(error) {
          // An error happened.
        });


      }

      function deleteUser(){

        var user = firebase.auth().currentUser;
        user.delete().then(function() {
          // User deleted.
        }, function(error) {
          // An error happened.
        });
      }

      function userLogout() {
        firebase.auth().signOut();
        util.setLoggedInUser(null);
      }

      function userLogin(user){

        return firebase.auth().signInWithEmailAndPassword(user.email, user.password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });

      }


      return {
        createUser: newUser,
        userLogin: userLogin,
        forgotPassword: forgotPassword,
        deleteUser: deleteUser,
        testDB: test,
        userLogout: userLogout
      };
    });

})();
