const express = require('express')
const next = require('next')
const cors = require('cors');
const axios = require('axios');
const {dialogflow} = require('actions-on-google');
const bodyParser = require('body-parser')


const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
require('dotenv').config();
const assistant = dialogflow();
const firebase = require('firebase');

const config = {
  apiKey: process.env.FIREBASE_API,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PRODJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID
};

firebase.initializeApp(config);

app.prepare()
.then(() => {
  const server = express()

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
    const database = firebase.database();
 }

  // For cors configuration
  server.use(cors())

  server.get('/search/:busstop', (request, response) => {
    const busStop = request.params.busstop;
    const actualPage = '/search'

    axios.get(`http://api.translink.ca/rttiapi/v1/stops/${busStop}/estimates?apikey=${process.env.TRANSLINK_API}`)
      .then(res =>  {
        // console.log(res.data);
        // response.send(res.data)
        const queryParams = { estimates: res.data }
        response.estimates = res.data
        app.render(request, response, actualPage, queryParams)
      })
      .catch(error => {
        console.log(error);
      });
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  assistant.intent('BusEstimates', async (conv, {number}) => {
    console.log("number", number)
    const estimates = await axios.get(`http://api.translink.ca/rttiapi/v1/stops/${number}/estimates?apikey=${process.env.TRANSLINK_API}`)
     .then(res =>  {
       return res.data
     })
     .catch(error => {
       return error.response.data.Message
     });

     const convRespose = []
     if(typeof estimates === 'string'){
       conv.ask(estimates);
     } else {
       estimates.map((estimate)=> {
         convRespose.push(estimate.RouteNo)
       })
       conv.ask(convRespose.join());
     }
  });

  server.post('/webhook', assistant);

  server.use(bodyParser.json(), assistant).listen(5005, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:5005')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
