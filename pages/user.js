import Layout from '../components/Layout.js'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import Alarm from './alarm'

const User = (props) => {
  // console.log("props", props)
  const userID = "changeThis"
  return (

      <Layout>
        <div className="container" style={{display:'flex'}}>
          <div style={{margin:'0 10%'}}>
            <h1>Your Fav list</h1>
            <span>
         {
           props.history ?
           Object.values(props.history).map(history => (
             <ul>
               <li><Link as={`/user/${userID}/${history}`} href={`/user/${userID}/${history}`}><a>{history.busStop}</a></Link></li>
             </ul>
           )) : <ul></ul>
         }
         </span>
          </div>
          <div style={{margin:'0 10%'}}>
            <h1>Bus schedule notification alarm</h1>
            <Alarm></Alarm>
          </div>
        </div>

      </Layout>
  )
}

User.getInitialProps = async function({query}) {
  console.log("user", query)
  return query
}

export default User
