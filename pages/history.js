import Layout from '../components/Layout.js'
import Link from 'next/link'

const History = (props) => {
  // console.log("props", props)
  const userID = "changeThis"
  return (

      <Layout>
        <div className="container" style={{display:'flex'}}>
          <div style={{margin:'0 10%'}}>
            <h1>Your Search History</h1>
            <span>
             {
               props.history ?
               Object.values(props.history).map(history => (
                 <ul>
                   <li><a href={`/search/${history.busStop}`}>{history.busStop}</a></li>
                 </ul>
               )) : <ul></ul>
             }
             </span>
          </div>
        </div>

      </Layout>
  )
}

History.getInitialProps = async function({query}) {
  console.log("==========user===========", query)
  return query
}

export default History
