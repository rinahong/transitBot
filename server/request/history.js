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

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  const database = firebase.database();
}

module.exports = {
  all: async function (username) {
    console.log("history.all")
  	const userHistory = firebase.database().ref(`user/${username}/history`);
     return userHistory.once('value').then(function(snapshot) {
        return snapshot.val()
     });
  },

  create: function(username, busStop) {
    console.log("history.create")
    const dateTimeNow = moment().format()
    firebase.database().ref(`user/${username}/history/${dateTimeNow}`).set({
      user: username,
      busStop: busStop
    });
  }
}
