// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const firebase = require('firebase');

const {WebhookClient, Card, Suggestion} = require('dialogflow-fulfillment');
const axios = require('axios');
require('dotenv').config();

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  var config = {
    apiKey: process.env.FIREBASE_API,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

  function BusEstimates(agent) {
    agent.add('BusEstimates')
    // return axios.get(`http://api.translink.ca/rttiapi/v1/stops/60980/estimates?apikey=${process.env.TRANSLINK_API}`)
    //   .then(res =>  {
    //     console.log("Res: ", res.data)
    //     // return res.data.map((estimate) => {
    //     //   return agent.add(estimate.title);
    //     // })
    //
    //     return {}
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     return {}
    //   });
  }

  let intentMap = new Map();
  intentMap.set('BusEstimates', BusEstimates);

  agent.handleRequest(intentMap);
});
