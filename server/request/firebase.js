const firebase = require('firebase');
require('dotenv').config();
var moment = require('moment');
const config = {
  apiKey: process.env.FIREBASE_API,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PRODJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID
};
firebase.initializeApp(config);
// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
//   const database = firebase.database();
// }

module.exports = {
  historyAll: function (username) {
    console.log("history.all")
  	const userHistory = firebase.database().ref(`user/${username}/history`);
    return userHistory.once('value').then(function(snapshot) {
      return snapshot.val()
    });
  },

  historyCreate: function(username, busStop) {
    console.log("history.create")
    const dateTimeNow = moment().format()
    firebase.database().ref(`user/${username}/history/${dateTimeNow}`).set({
      user: username,
      busStop: busStop
    });
  },

  alarmCreate: function(username, recurringSchedule, busStop) {
    console.log("alarm.create")
    const dateTimeNow = moment().format()
    return firebase.database().ref(`user/${username}/alarm/${dateTimeNow}`).set({
      recurringSchedule: recurringSchedule,
      busStop: busStop
    })
    .then((res) => {
      return "Alarm created"
    });
  },

  register: function (email, password){
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => ({success: res.user.email}))
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(`${errorCode} ${errorMessage}`);
      return {fail: errorMessage}
    });
  },

  login: function (email, password){
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  },

  logOut: function (){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }
}
