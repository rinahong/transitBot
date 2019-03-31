import React, {Component} from 'react';
import Link from 'next/link'
import Router from 'next/router'
import axios from 'axios';
import Layout from '../components/Layout.js'

class Register extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      failStatus: ""
    };

    this.createToken = this.createToken.bind(this);
  }

  handleChange (name) {
    return event => {
      const {currentTarget} = event;
      this.setState({[name]: currentTarget.value});
    };
  }

  createToken (event) {
    event.preventDefault();
    const {email, password} = this.state;
    const that = this;
    axios.post('/register', {email, password})
    .then(function (response) {
      if(response.data.success) {
        localStorage.setItem('currentUser', response.data.success);
        // // that.props.url.push('/user');
        // Router.push('/')
      } else {
        that.setState({failStatus: response.data.fail});
      }
    })
    .catch(function (error) {
      that.setState({failStatus: error});
    });
  }

  render () {
    const {email, password, failStatus} = this.state;
    return (
      <main
        className="Register"
        style={{
          padding: '0 20px'
        }}
      >
        {
          failStatus ?
          <h3>{failStatus} - Please retry</h3>:
          <span></span>
        }
        <h2>Register</h2>
        <form onSubmit={this.createToken}>
          <div>
            <label htmlFor='email'>Email</label> <br />
            <input
              value={email}
              onChange={this.handleChange('email')}
              type='email'
              id='email'
              name='email'
            />
          </div>

          <div>
            <label htmlFor='password'>Password</label> <br />
            <input
              value={password}
              onChange={this.handleChange('password')}
              type='password'
              id='password'
              name='password'
            />
          </div>

          <div>
            <input type='submit' value='Register'/>
          </div>
        </form>
      </main>
    )
  }
}

export default Register;
