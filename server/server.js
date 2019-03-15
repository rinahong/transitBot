const express = require('express')
const next = require('next')
const cors = require('cors');
const axios = require('axios');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
require('dotenv').config();


app.prepare()
.then(() => {
  const server = express()

  // For cors configuration
  server.use(cors())
  // server.use(function (req, res, next) {
  //    // Website you wish to allow to connect
  //    res.setHeader('Access-Control-Allow-Origin', '*');
  //
  //    // Request methods you wish to allow
  //    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  //
  //    // Request headers you wish to allow
  //    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept');
  //
  //    // Set to true if you need the website to include cookies in the requests sent
  //    // to the API (e.g. in case you use sessions)
  //    res.setHeader('Access-Control-Allow-Credentials', true);
  //
  //    // Pass to next layer of middleware
  //    next();
  // });

  server.get('/search/:busstop', (request, response) => {
    const busStop = request.params.busstop;
    const actualPage = '/search'

    axios.get(`http://api.translink.ca/rttiapi/v1/stops/60980/estimates?apikey=${process.env.TRANSLINK_API}`)
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

  server.listen(5005, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:5005')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
