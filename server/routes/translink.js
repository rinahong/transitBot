const express = require('express');
const router = express.Router();
const axios = require('axios');

// localhost:3002/posts/:id
router.get('/:busstop', (request, response) => {
  const busStop = request.params.busstop;
  const actualPage = '/search'

  axios.get(`http://api.translink.ca/rttiapi/v1/stops/60980/estimates?apikey=KA7tOougTQ7LDL2JzCvJ`)
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
});

// PATH: /posts VERB: GET List all the posts
router.get('/', (request, response) => {
})

module.exports = router;

// bump
