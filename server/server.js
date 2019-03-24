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
const history = require('./request/history');

app.prepare()
.then(() => {
  const server = express()

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

  server.get('/user', (request, response) => {
    const actualPage = '/user'
    history.all('rina')
    .then(res => {
      const queryParams = { history: res}
      app.render(request, response, actualPage, queryParams)
    })
  })

  server.post('/user/create', (request, response) => {
    history.create('rina', 12345)
    const actualPage = '/user'
    app.render(request, response, actualPage)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

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
