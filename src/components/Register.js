import React,{Component} from 'react'
// import'./Register.css'

const onSubmit = (handleState, setToken) => {
  const email = document.getElementById('email-address').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value;
  const contact = document.getElementById('contact').value;
  const options  = {
    method:'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({email, password, contact, name}),
  }

  fetch('https://task2api.herokuapp.com/register', options)
  .then(res => res.json())
  .then((res) => {
      if(res.token) {
        setToken(res);
        const userOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(res)
        };
        fetch(`https://task2api.herokuapp.com/user`, userOptions)
        .then((res) => res.json())
        .then(res => handleState(res))
      } else {console.error(res.msg)}
  }).catch((err) => console.log('couldn\'t register'));
}

function Register(props) {
    return (
      <div>
        <main class="pa4 black-80">
    <form class="measure shadow-5 pa4 center">
      <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
        <legend class="f4 fw6 ph4 mh0">Register!!!</legend>
        <div class="mt3 ph4">
          <label class="db fw6 lh-copy f6" for="email-address">Email</label>
          <input class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
        </div>
        <div class="mt3 ph4">
          <label class="db fw6 lh-copy f6" for="name">User Name </label>
          <input class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
        </div>

        <div class="mv3 ph4">
          <label class="db fw6 lh-copy f6" for="password">Password</label>
          <input class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
        </div>
        <div class="mv3 ph4">
          <label class="db fw6 lh-copy f6" for="contact">contact</label>
          <input class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="contact"  id="contact"/>
        </div>
     </fieldset>
      <div class="ph4">
        <input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" onClick={() =>onSubmit(props.handleState, props.setToken)} value="Register" />
      </div>
      </form>
  </main>

      </div>
    );
}

export default Register;
