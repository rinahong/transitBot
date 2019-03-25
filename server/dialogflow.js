const bodyParser = require('body-parser')
const {dialogflow} = require('actions-on-google');
const translink = require('./request/translink');
const assistant = dialogflow();

let busStop = ''
let schedules = {}

assistant.intent('BusEstimates - busNumber', (conv, {number}) => {
  console.log("number", number)
  console.log("schedules ----> ", schedules)
  const convResponse = []
  schedules[number].map((schedule)=> {
    convResponse.push(`${schedule.ExpectedLeaveTime}`)
  })
  conv.ask(convResponse.join());
});

assistant.intent('BusEstimates', async (conv, {number}) => {
  console.log("number", number)
  busStop = number

  const estimates = await translink.estimates(number)
  const convResponse = []
  if(typeof estimates === 'string'){
    conv.ask(estimates);
  } else {
    estimates.map((estimate)=> {
      schedules[estimate.RouteNo]= estimate.Schedules
      convResponse.push(`${estimate.RouteNo}`)
    })
    conv.ask(convResponse.join());
  }
});


module.exports = assistant;
