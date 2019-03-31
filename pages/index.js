import Layout from '../components/Layout.js'
// import Link from 'next/link'
//
// export default () => {
//   return (
//     <Layout>
//       <h1>Welcome to Transit Bot</h1>
//     </Layout>
//   )
// }

import React, {Component} from 'react';
import MenuBar from '../components/MenuBar';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Register from './register'
import User from './user'
// import Login from './login'


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true
    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  signIn() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.setState({user: currentUser, loading: false});
    } else {
      this.setState({loading: false});
    }
  }

  signOut() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      localStorage.removeItem('currentUser');
      this.setState({user: null, loading: false});
    }
  }


  componentDidMount () {
      this.signIn();
  }

  render () {
    const {user, loading} = this.state;

    if (loading) {
      return (
        <div>
          Loading...
        </div>
      );
    }
    return (
      <Layout user={user} onSignOut={this.signOut}>
        <h1>Welcome to Transit Bot</h1>
        // <MenuBar user={user} onSignOut={this.signOut}/>
      </Layout>
    );
  }
}

export default Index;
