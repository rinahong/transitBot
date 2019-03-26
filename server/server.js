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
const alarm = require('node-schedule');

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

  // firebaseAPI.alarms()
  // .then(alarms => {
  //   alarms.map((alarm) => {
  //     // {hour: 14, minute: 30, dayOfWeek: 0}
  //     var j = alarm.scheduleJob(alarm, function(){
  //       console.log('Time for tea!');
  //     });
  //   })
  // })

  server.get('/search/:busstop', (request, response) => {
    const busStop = request.params.busstop;
    const actualPage = '/search'

    translink.estimates(busStop)
    .then(estimates => {
      const queryParams = { estimates: estimates}
      if(typeof estimates !== 'string') {
        firebaseAPI.historyCreate('rina', busStop)
      }
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
    firebaseAPI.historyAll('rina')
    .then(res => {
      const queryParams = { history: res}
      app.render(request, response, actualPage, queryParams)
    })
  })

  server.post('/user/alarm', (request, response) => {
    console.log("in alarm")
    const {alarmSchedule, busStop} = request.body
    console.log("in alarm", alarmSchedule)
    firebaseAPI.alarmCreate("rina", alarmSchedule, busStop)
    .then(res => {
        var j = alarm.scheduleJob('alarmSchedule', function(){
          console.log('fire alarmSchedule');
          const actualPage = '/user'

          translink.estimates(busStop)
          .then(estimates => {
            const queryParams = { estimates: estimates}
            response.estimates = estimates
            app.render(request, response, actualPage, queryParams)
          });
        });
    })
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
