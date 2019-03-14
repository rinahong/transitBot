// Stop Estimates - Examples
// http://api.translink.ca/rttiapi/v1/stops/60980/estimates?apikey=[APIKey]
// - Returns the next 6 buses for each route to service the stop in the next 24 hours
// http://api.translink.ca/rttiapi/v1/stops/60980/estimates?apikey=[APIKey]&count=3&timeframe=120
// - Returns the next 3 buses for each route to service the stop in the next 2 hours meters
// http://api.translink.ca/rttiapi/v1/stops/60980/estimates?apikey=[APIKey]&count=3&timeframe=120&routeNo=050
// - Returns the next 3 buses to service the stop in the next 2 hours for route 50
// http://api.translink.ca/rttiapi/v1/stops/60980/estimates?apikey=[APIKey]&routeNo=050
// - Returns the next 6 buses to service the stop in the next 24 hours for route 50

const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = 'http://api.translink.ca';
const API_KEY = 'KA7tOougTQ7LDL2JzCvJ';

import axios from 'axios'

export const RTTIEstimates = {
   get (busStop) {
     console.log("------")
    return axios.get(PROXY_URL + `http://api.translink.ca/rttiapi/v1/stops/60980/estimates?apikey=KA7tOougTQ7LDL2JzCvJ`)
      .then(res => res.data)

  },

}

// Only use it while debugging.
// window.RTTIEstimates = RTTIEstimates;
