import Layout from '../components/Layout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import axios from 'axios';



const Map = (props) => (
    <Layout>
    </Layout>
)

Map.getInitialProps = function() {
 axios.get('http://api.translink.ca/rttiapi/v1/stops/55612?apikey=KA7tOougTQ7LDL2JzCvJ', {
    mode: "no-cors",
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    console.log("res", res.data)
    return res.data
  })
  .catch(err => {
    console.log("err", err)
    return {}
  })

  return {}
}



export default Map
