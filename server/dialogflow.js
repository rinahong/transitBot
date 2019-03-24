const bodyParser = require('body-parser')
const {dialogflow} = require('actions-on-google');
const translink = require('./request/translink');
const assistant = dialogflow();

assistant.intent('BusEstimates', async (conv, {number}) => {
  console.log("number", number)

  const estimates = await translink.estimates(number)
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


module.exports = assistant;
