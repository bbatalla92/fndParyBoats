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
      var geoFire = new GeoFire(rootRef.child('GeoFire'));
      // Get a reference to the storage service, which is used to create references in your storage bucket
      var storage = firebase.storage();
      // Create a storage reference from our storage service
      var storageRef = storage.ref();
      util.loggedIn = (getCurrentUser() != null);




// ==================== functions =================================================
      function saveCharter(charter) {

        var user = getCurrentUser();
        rootRef.child('UserProfiles').child(user.uid).once('value', function (use) {
          util.loggedIn = use.val();
          var u = use.val();
          var chartID  = '';
          if (u.boatId == null) {
            chartID = rootRef.child('boats').push(charter);
            rootRef.child('boats').child(chartID).child('featured').set(false);
            rootRef.child('UserProfiles').child(user.uid).child('boatId').set(chartID.key());
            rootRef.child('States').child(charter.state).child(chartID.key()).set(chartID.key());
          } else {
            chartID = u.boatId;
            rootRef.child('boats').child(u.boatId).set(charter);
          }

          util.getLatLong(charter.zipCode).then(function(data){
            console.log(data);
            rootRef.child('boats').child(u.boatId).child('location').set(data);

            geoFire.set(chartID, [data.lat, data.long]);
          });
          //
        });
      }

      function getCurrentUser(){
        return firebase.auth().currentUser;

      }

      function newUser(newU){
        var newFlag = $q.defer();
        firebase.auth().createUserWithEmailAndPassword(newU.email, newU.password).then(function(data){
          rootRef.child('UserProfiles').child(data.uid).set({email: data.email, uid: data.uid});
          rootRef.child('UserProfiles').child(data.uid).once('value', function(data){
            util.loggedIn = data.val();
            newFlag.resolve(true);
          });

        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log('ERROR: ',error.message);
          newFlag.resolve(error);
          return error;
        });

        return newFlag.promise;
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

      function getCharterByKey(key){
        var charter = $q.defer();
        rootRef.child('boats').child(key).once('value', function (chart) {

          charter.resolve(chart.val());
        });

        return charter.promise;
      }


      function getAllCharters(){
        var charters = $q.defer();
        rootRef.child('boats').once('value',function(data){

          // console.log(data.val());
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
        // console.log('Logged Out');
      }

      function userLogin(user){
        var us = $q.defer();
        // util.loggedIn = true;
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
          .then(function(user){

            // console.log(user);

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

      function getAllStates(){
        var states = $q.defer();
        rootRef.child('States').once('value',function (data) {
          states.resolve(data.val());
        });
        return states.promise;
      }

      function getChartersByState(state){
        var b = $q.defer();
        rootRef.child('boats').orderByChild('state').equalTo(state).once('value', function (data) {
          b.resolve(data.val())
        });

        return b.promise;
      }

      function getCharterByZip(zip){
        var charters = [];
        var list = $q.defer();
        var listFlag = false;
        util.getLatLong(zip).then(function(data){
          var geoQuery = geoFire.query({
            center: [data.lat, data.long],
            radius: 15.5343
          });

          geoQuery.on("key_entered", function(key, location, distance) {
            listFlag = true;
            getCharterByKey(key).then(function(boat){
              boat.distance = convertToMiles(distance);

              charters.push(boat);
              list.resolve(charters);

            });
          });


          geoQuery.on("ready", function(data) {
            if(!listFlag){
              list.resolve(null);
            }
          });



        });


        return list.promise;
      }

      function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
          if (list[i] === obj) {
            return true;
          }
        }

        return false;
      }

      function getFeaturedCharterByZip(lat,long){
        var featured = [];

        var list = $q.defer();
        var listFlag = false;

        var geoQuery = geoFire.query({
          center: [lat, long],
          radius: 85
        });

        geoQuery.on("key_entered", function(key, location, distance) {
          listFlag = true;

          rootRef.child('boats').child(key).once('value', function (chart) {

            var boat = chart.val();
            if(boat.featured === true){
              boat.distance = convertToMiles(distance);
              if(!containsObject(boat, featured))
                featured.push(boat);

              util.featuredList = featured;
              list.resolve(featured);
            }
          });

        });


        geoQuery.on("ready", function(data) {
          if(!listFlag){
            list.resolve(null);
          }
        });


        return list.promise;
      }

      function convertToMiles(dist){
        return dist * 1.60934;
      }


// ============== End of functions =======================================

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
        getAllCharters: getAllCharters,
        getAllStates: getAllStates,
        getChartersByState: getChartersByState,
        getCharterKeysByZip : getCharterByZip,
        getFeaturedCharterByZip : getFeaturedCharterByZip
      };
    });

})();
