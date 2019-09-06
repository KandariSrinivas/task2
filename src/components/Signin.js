import React,{Component} from 'react'
// import'./Signin.css'

class Signin extends Component{
  constructor() {
    super();
    this.state = {
      email: '',
      password:'',
    }
  }

 onChange = (event) => {
   if(event.target.id === "email-address") this.setState({email:event.target.value});
   else if(event.target.id === "password") this.setState({password:event.target.value});
 }

 onSubmit = (event) => {
   let {email, password} = this.state;
   let data = {email, password};
   const options = {
     method: 'POST',
     headers: { 'Content-Type' : 'application/json', "Access-Control-Origin": "*"},
     body: JSON.stringify(data)
   };
   fetch('https://task2api.herokuapp.com/signin', options)
   .then(res => res.json())
   .then(res => {
     if(res.token) {
       this.props.setToken(res);
       const userOptions = {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(res)
       };
       fetch(`https://task2api.herokuapp.com/user`, userOptions)
       .then((res) => res.json())
       .then(res => this.props.handleState(res))
     }else {console.error(res.msg)}
   })
   .catch(() => console.log('wrong credentials'));
 }



  render() {
   return (
     <div>
       <main className="pa4 black-80">
   <form className="measure shadow-5 pa4 center">
     <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
       <legend className="f4 fw6 ph4 mh0">Sign In</legend>
       <div className="mt3 ph4">
         <label className="db fw6 lh-copy f6" for="email-address">Email</label>
         <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange = {this.onChange} type="email" name="email-address"  id="email-address" />
       </div>
       <div className="mv3 ph4">
         <label className="db fw6 lh-copy f6" for="password">Password</label>
         <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange = {this.onChange} type="password" name="password"  id="password"/>
       </div>
    </fieldset>
     <div className="ph4">
       <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" onClick={this.onSubmit} value="Sign in" />
     </div>
     </form>
 </main>

     </div>
   );

}
}
export default Signin;
