import React, {Component} from 'react';

const Home = ({ name, email, contact}) => {
  return (
    <div style={{textAlign:'center', marginTop: '10%'}}>
    <div style={{display: 'inline-block'}}>
      <h1>Hello! <i> {name} </i> <br/> How you doing! </h1>
      <strong>Your Details: </strong>
      <p>Email: {email}</p>
      <p>Mobile No: {contact}</p>
      
    </div>
    </div>
  )
}

export default Home;
