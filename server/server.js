const express = require('express')
const next = require('next')
const cors = require('cors');
const axios = require('axios');
const { dialogflow } = require('actions-on-google');
const bodyParser = require('body-parser')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

require('dotenv').config();

const assistant = require('./dialogflow');
const translink = require('./request/translink');
const firebaseAPI = require('./request/firebase');
let currentUser = ''

app.prepare()
.then(() => {
  const server = express()

  server.use(bodyParser.json())
  // For cors configuration
  server.use(cors())

  server.get('/search/:busstop', (request, response) => {
    const busStop = request.params.busstop;
    const actualPage = '/search'

    translink.estimates(busStop)
    .then(estimates => {
      const queryParams = { estimates: estimates}
      response.estimates = estimates
      app.render(request, response, actualPage, queryParams)
    });
  })

  server.post('/register', (request, response) => {
    console.log(request.body)
    const {email, password} = request.body
    const actualPage = '/register'
    firebaseAPI.register(email, password)
    .then(res => {
      if(res.success) {
        currentUser = res.success
      }
      const queryParams = res
      response.send(queryParams)
    })
  })

  server.get('/user', (request, response) => {
    const actualPage = '/user'
    console.log("check user server")
    firebaseAPI.historyAll('rina')
    .then(res => {
      const queryParams = { history: res}
      app.render(request, response, actualPage, queryParams)
    })
  })

  server.post('/user/create', (request, response) => {
    firebaseAPI.historyCreate('rina', 12345)
    const actualPage = '/user'
    app.render(request, response, actualPage)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.post('/webhook', assistant);

  server.use(assistant).listen(5005, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:5005')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
