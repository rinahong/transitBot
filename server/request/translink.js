const axios = require('axios');
require('dotenv').config();
let translink = {}

translink.estimates = async function(busStop){
  const estimates = await axios.get(`http://api.translink.ca/rttiapi/v1/stops/${busStop}/estimates?apikey=${process.env.TRANSLINK_API}`)
   .then(res =>  {
     return res.data
   })
   .catch(error => {
      return error.response.data.Message
   });

   return estimates;
}

module.exports = translink;
