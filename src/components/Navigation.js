import React, {Component} from 'react';

var Navigation = ({route, handleState}) => {

  if ((route === 'signin' || route ==='register') ) {
   return(<div>
     <p className='tr underline fw5 pointer dim mr4 mv2' onClick={()=>handleState({route:'signin'})} >SignIn </p>
     <p className='tr underline fw5 pointer dim mr4 mv2' onClick={()=>handleState({route:'register'})} >Register</p>
   </div>); }
   else {
  return(
   <div>
       <p className='tr underline fw5 pointer dim mr4 mv2' onClick={()=>handleState({route:'signin', clearToken: true})} >Sign Out</p>
   </div>);
 }
}

export default Navigation;
