import Layout from '../components/Layout.js'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import Alarm from './alarm'

const User = (props) => (
    <Layout>
      <div className="container" style={{display:'flex'}}>
        <div style={{margin:'0 10%'}}>
          <h1>Your Fav list</h1>
        </div>
        <div style={{margin:'0 10%'}}>
          <h1>Bus schedule notification alarm</h1>
          <Alarm></Alarm>
        </div>
      </div>

    </Layout>
)

User.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()
  return {
    shows: data
  }
}

export default User
