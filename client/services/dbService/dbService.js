/**
 * Created by Brennan on 6/19/2016.
 */
'use strict';

(function(){
  angular.module('fndParyBoatsApp')
    .factory('dbService', function ($q, util, $state) {
      var rootRef = new Firebase('https://findpartyboat.firebaseio.com/');
      var config = {
        apiKey: "AIzaSyCkDhfBJEjsAG_Ar12ZEO76w1UT-BKpe_s",
        authDomain: "findpartyboat.firebaseapp.com",
        databaseURL: "https://findpartyboat.firebaseio.com",
        storageBucket: "findpartyboat.appspot.com"
      };
      firebase.initializeApp(config);
      // Get a reference to the storage service, which is used to create references in your storage bucket
      var storage = firebase.storage();
      // Create a storage reference from our storage service
      var storageRef = storage.ref();
      util.loggedIn = (getCurrentUser() != null);

      function saveCharter(charter) {

        var user = getCurrentUser();
        rootRef.child('UserProfiles').child(user.uid).once('value', function (use) {
          util.loggedIn = use.val();
          var u = use.val();
          if (u.boatId == null) {
            var chartID = rootRef.child('boats').push(charter);
            console.log(chartID);
            rootRef.child('UserProfiles').child(user.uid).child('boatId').set(chartID.key());
            rootRef.child('States').child(charter.state).child(chartID.key()).set(chartID.key());
          } else {
            rootRef.child('Boats').child(u.boatId).set(charter);
          }


          //
        });
      }

      function getCurrentUser(){
        return firebase.auth().currentUser;

      }

      function newUser(newU){
        firebase.auth().createUserWithEmailAndPassword(newU.email, newU.password).then(function(data){
          rootRef.child('UserProfiles').child(data.uid).set({email: data.email, uid: data.uid});
          rootRef.child('UserProfiles').child(data.uid).once('value', function(data){
            util.loggedIn = data.val();
          });

        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log('ERROR: ',error.message);
          return error;
        });

        return true;

      }

      function test(){
        rootRef.child('test').push({hello:'Hello'})
      }

      function getCharterBoat(){
        var charter = $q.defer();
        var user = getCurrentUser();
        rootRef.child('UserProfiles').child(user.uid).once('value', function (use) {
          util.loggedIn = use.val();
          var u = use.val();
          if (u.boatId == null) {
            return false;
          } else {
            rootRef.child('boats').child(u.boatId).once('value', function(boat){

              charter.resolve(boat.val());
            });
          }


          //
        });

        return charter.promise;
      }

      function getAllCharters(image, uid){
        var charters = $q.defer();
        rootRef.child('boats').once('value',function(data){

          console.log(data.val());
          charters.resolve(data.val());

        });
        return charters.promise;
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
        util.loggedIn = false;
        console.log('Logged Out');
      }

      function userLogin(user){
        var us = $q.defer();
        // util.loggedIn = true;
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
          .then(function(user){

            console.log(user);

            rootRef.child('UserProfiles').once('value', function(data){
              //console.log(data.val());
              util.loggedIn = data.val();
              us.resolve(data.val());
            })

          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });
        return us.promise;

      }


      return {
        createUser: newUser,
        userLogin: userLogin,
        forgotPassword: forgotPassword,
        deleteUser: deleteUser,
        testDB: test,
        userLogout: userLogout,
        saveCharter: saveCharter,
        getCurrentUser: getCurrentUser,
        getCharterBoat: getCharterBoat,
        getAllCharters: getAllCharters
      };
    });

})();
