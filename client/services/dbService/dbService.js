/**
 * Created by Brennan on 6/19/2016.
 */
'use strict';

(function () {
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
                var promise = $q.defer();
                var user = getCurrentUser();
                rootRef.child('UserProfiles').child(user.uid).once('value', function (use) {
                    util.loggedIn = use.val();
                    var u = use.val();
                    var id;
                    if (u.admin) {
                        id = saveCharterAsAdmin(charter, u);
                    } else {
                        id = saveCharterNonAdmin(charter, u);
                    }
                    promise.resolve(id);
                    util.getLatLong(charter).then(function (data) {
                        rootRef.child('boats').child(id).child('location').set(data);
                        geoFire.set(id, [data.lat, data.long]);
                    });
                });

                return promise.promise;
            }

            function createAccountFromCharterPage(charterID, newU) {
                var completeFlag = $q.defer();
                newUser(newU).then(function (data) {
                    if (data) {
                        completeFlag.resolve(true);
                        var u = getCurrentUser();
                        rootRef.child('UserProfiles').child(u.uid).child('boatId').set(charterID);
                        rootRef.child('boats').child(charterID).child('fosterID').set(null);
                        rootRef.child('boats').child(charterID).child('recovered').set(true);
                        $state.go('admin');
                        $mdDialog.cancel();
                    }
                    $scope.loadingFlag = false;
                });
                return completeFlag.promise;
            }

            function sendNewCharterEmail(c) {
                var u = getCurrentUser();
                var charter = angular.copy(c);
                var chart = {};

                chart.fosterID = u.uid;
                chart.email = charter.email;
                chart.id = charter.id;
                rootRef.child('adminAddedCharter').child(chart.id).set(chart);
            }

            function saveCharterNonAdmin(charter, u) {
                var chartID = '';

                if (u.boatId === undefined) {
                    var id = rootRef.child('boats').push(charter);
                    chartID = id.key();
                    rootRef.child('boats').child(chartID).child('id').set(chartID);
                    rootRef.child('UserProfiles').child(u.uid).child('boatId').set(chartID);
                    rootRef.child('newlyAddedCharter').child(chartID).set(u.email);
                } else {
                    chartID = u.boatId;
                    rootRef.child('boats').child(u.boatId).set(charter);
                    if (charter.id == undefined)
                        rootRef.child('boats').child(chartID).child('id').set(chartID);
                }

                rootRef.child('States').child(charter.state).child(chartID).set(chartID);
                return chartID;
            }

            function saveCharterAsAdmin(c, u) {
                var charter = angular.copy(c);
                var chart = {id: ''};
                var chartID;
                if (charter.id === undefined) {
                    var preID = rootRef.child('boats').push(charter);
                    chart.id = preID.key();
                    rootRef.child('boats').child(chart.id).child('featured').set(false);
                    rootRef.child('boats').child(chart.id).child('id').set(chart.id);
                    rootRef.child('UserProfiles').child(u.uid).child('boats').child(chart.id).set(chart.id);
                } else {
                    rootRef.child('boats').child(charter.id).set(charter);
                    chart.id = charter.id;
                }
                rootRef.child('States').child(charter.state).child(chart.id).set(chart.id);
                rootRef.child('boats').child(chart.id).child('fosterID').set(u.uid);


                chart.fosterID = u.uid;
                chart.email = charter.email;

                return chart.id;


            }

            function getCurrentUser() {
                return firebase.auth().currentUser;
            }

            function getAdminBoatList(user) {
                var list = $q.defer();
                rootRef.child('UserProfiles').child(user.uid).child('boats').once('value', function (data) {

                    // console.log('list', data.val());
                    list.resolve(data.val());

                });
                return list.promise;
            }

            function newUser(newU) {
                var newFlag = $q.defer();
                firebase.auth().createUserWithEmailAndPassword(newU.email, newU.password).then(function (data) {
                    rootRef.child('UserProfiles').child(data.uid).set({email: data.email, uid: data.uid});
                    rootRef.child('pending').push(newU.email);
                    rootRef.child('UserProfiles').child(data.uid).once('value', function (data) {
                        util.loggedIn = data.val();
                        newFlag.resolve(data);
                    });

                }, function (error) {
                    newFlag.resolve(error);
                }).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    newFlag.resolve(error);
                    return error;
                });

                return newFlag.promise;
            }

            function getCharterBoat() {
                var charter = $q.defer();
                var user = getCurrentUser();
                rootRef.child('UserProfiles').child(user.uid).once('value', function (use) {
                    util.loggedIn = use.val();
                    var u = use.val();
                    if (u.boatId == null) {
                        return false;
                    } else {
                        rootRef.child('boats').child(u.boatId).once('value', function (boat) {

                            charter.resolve(boat.val());
                        });
                    }
                    //
                });
                return charter.promise;
            }


            function getFullUser(user) {
                var u = $q.defer();
                rootRef.child('UserProfiles').child(user.uid).once('value', function (use) {
                    u.resolve(use.val());
                });
                return u.promise;
            }


            function getCharterByKey(key) {
                var charter = $q.defer();
                rootRef.child('boats').child(key).once('value', function (chart) {

                    charter.resolve(chart.val());
                });

                return charter.promise;
            }


            function getAllCharters() {
                var charters = $q.defer();
                rootRef.child('boats').once('value', function (data) {

                    // console.log(data.val());
                    charters.resolve(data.val());

                });
                return charters.promise;
            }

            function forgotPassword(email) {
                user = firebase.auth().sendPasswordResetEmail(email).then(function () {
                    // Email sent.
                }, function (error) {
                    // An error happened.
                });


            }

            function deleteUser() {

                var user = firebase.auth().currentUser;
                user.delete().then(function () {
                    // User deleted.
                }, function (error) {
                    // An error happened.
                });
            }


            function userLogout() {
                firebase.auth().signOut();
                util.loggedIn = false;
            }


            function userLogin(user) {
                var us = $q.defer();
                // util.loggedIn = true;
                firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                    .then(function (user) {

                        // console.log(user);

                        rootRef.child('UserProfiles').once('value', function (data) {
                            //console.log(data.val());
                            util.loggedIn = data.val();
                            us.resolve(data.val());
                        })

                    }, function (error) {
                        us.resolve(error);
                    })
                    .catch(function (error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // ...
                    });
                return us.promise;
            }

            function getAllStates() {
                var states = $q.defer();
                rootRef.child('States').once('value', function (data) {
                    states.resolve(data.val());
                });
                return states.promise;
            }

            function getCharterByID(id) {
                var chart = $q.defer();
                rootRef.child('boats').child(id).once('value', function (data) {
                    chart.resolve(data.val());
                });
                return chart.promise;
            }

            function getChartersByState(state) {
                var b = $q.defer();
                rootRef.child('boats').orderByChild('state').equalTo(state).once('value', function (data) {
                    b.resolve(data.val())
                }, function (error) {
                    console.log('error', error)
                });

                return b.promise;
            }

            function getCharterByZip(zip) {
                var charters = [];
                var list = $q.defer();
                var listFlag = false;
                util.getLatLong(zip).then(function (data) {
                    var geoQuery = geoFire.query({
                        center: [data.lat, data.long],
                        radius: 135
                    });

                    geoQuery.on("key_entered", function (key, location, distance) {
                        listFlag = true;
                        getCharterByKey(key).then(function (data) {
                            if (data != null) {
                                var boat = angular.copy(data);
                                boat.distance = convertToMiles(distance);
                                charters.push(boat);
                            }

                            list.resolve(charters);

                        });
                    });


                    geoQuery.on("ready", function (data) {
                        if (!listFlag) {
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

            function getFeaturedCharterByZip(lat, long) {
                var featured = [];

                var list = $q.defer();
                var listFlag = false;

                var geoQuery = geoFire.query({
                    center: [lat, long],
                    radius: 85
                });

                geoQuery.on("key_entered", function (key, location, distance) {
                    listFlag = true;

                    rootRef.child('boats').child(key).once('value', function (chart) {

                        var boat = angular.copy(chart.val());
                        if (boat.featured === true) {
                            boat.distance = convertToMiles(distance);
                            if (!containsObject(boat, featured))
                                featured.push(boat);

                            util.featuredList = featured;
                            list.resolve(featured);
                        }

                    });

                });


                geoQuery.on("ready", function (data) {

                });


                return list.promise;
            }

            function convertToMiles(dist) {
                return Math.round(dist * 0.621371 * 10) / 10;
            }

            function saveNewsLetterEmail(email) {
                rootRef.child("newsLetter").child(parseEmail(angular.copy(email))).set(email);
            }

            function sendContactUsEmail(form) {
                rootRef.child('ContactUs').push(form);
            }

            function parseEmail(email) {
                //Characters that cant be used: ".",   "#", "$",  "[",  or "]"
                //Characters that will be used: "::", "??", "__", "((", or "))"
                var nEmail = ((((email.replace(/\./g, '::')).replace(/\#/g, '??')).replace(/\$/g, '__')).replace(/\[/g, '((')).replace(/\]/g, '))');
                return nEmail;
            }

// ============== End of functions =======================================

            return {
                createUser: newUser,
                userLogin: userLogin,
                forgotPassword: forgotPassword,
                deleteUser: deleteUser,
                userLogout: userLogout,
                saveCharter: saveCharter,
                getCurrentUser: getCurrentUser,
                getFullUser: getFullUser,
                getCharterBoat: getCharterBoat,
                getAllCharters: getAllCharters,
                getAllStates: getAllStates,
                createAccountFromCharterPage: createAccountFromCharterPage,
                sendNewCharterEmail: sendNewCharterEmail,
                getAdminBoatList: getAdminBoatList,
                getChartersByState: getChartersByState,
                getCharterKeysByZip: getCharterByZip,
                getFeaturedCharterByZip: getFeaturedCharterByZip,
                getCharterByID: getCharterByID,
                saveNewsLetterEmail: saveNewsLetterEmail,
                sendContactUsEmail:sendContactUsEmail
            };
        });

})();
