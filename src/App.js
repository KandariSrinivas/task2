import React, {useState, useEffect} from 'react';
import Register from './components/Register';
import Signin from './components/Signin';
import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';

var initialState ={
  route: 'signin',
  email:'',
  name: '',
  contact: '',
  token:'',
}

class App extends React.Component {
  constructor(props) {
      super();
      var oldToken = localStorage.getItem('authToken');
      var oldEmail = localStorage.getItem('authEmail');
      if(oldToken && oldEmail) this.state = Object.assign({}, initialState, {token: oldToken, email: oldEmail});
      else this.state = initialState;
  }

  setToken = (data) => {
    this.setState({token: data.token, email: data.email}, () => {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authEmail', data.email);
    })
  }

  handleState = (data) => {
    if(data.route){
      this.setState(Object.assign({}, initialState, {route: data.route}));
    } else {
    var {email, contact, name} = data
    this.setState({email, contact, name, route: 'home'});
  }
    if(data.clearToken) {
      localStorage.removeItem('authEmail');
      localStorage.removeItem('authToken');
    }

  }

  componentDidMount(){
    if(this.state.token!== '' && this.state.name === '') {
      fetch('https://task2api.herokuapp.com/user', {method: 'POST', headers: {'Content-Type': "application/json"}, body: JSON.stringify({token: this.state.token, email: this.state.email})})
            .then(res =>res.json())
            .then(res => {
              if(res.name){
              const {email, contact, name} = res;
              this.setState({email, contact, name, route: 'home'});
            } else {
              throw Error;
            }
            }).catch(err => this.setState({token: '', email: ''}))
    }
  }

  render(){
    const state = this.state;
    if(state.token !== '' && state.name === '') {
      return (<div> LOADING... </div>);
    }
    else{
    return (
      <div>
        <Navigation route={state.route} handleState={this.handleState} />
        {
          state.route === 'home' ? <Home name={state.name} email={state.email} contact={state.contact} /> : state.route === 'signin' ? <Signin setToken={this.setToken} handleState={this.handleState} /> : <Register setToken={this.setToken} handleState={this.handleState} />
        }
      </div>
    );
  }
}

}

export default App;
