import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

function App() {

const [user, setUser]= useState({
      isSignedIn : false,
      name : '',
      email : '',
      photo : ''
})

const provider = new firebase.auth.GoogleAuthProvider();
const handleSignIn = () =>{
      //console.log("sign in clicked");
      firebase.auth().signInWithPopup(provider)
      .then(res =>{
        const{displayName,photoURL,email}=res.user;
        const signedInUser={
          isSignedIn : true,
          name: displayName,
          email: email,
          photo : photoURL

        }
        setUser(signedInUser);
        console.log(displayName,photoURL,email);
      })
      .catch(err =>{
        console.log(err);
        console.log(err.message);
      })
}
const handleSignOut = ()=>{
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    
  }).then(res =>{
    const{displayName,photoURL,email}=res.user;
        const signedOutUser={
          isSignedIn : false,
          name: '',
          email: '',
          photo : ''

        }
        setUser(signedOutUser);
  })
  
  .catch(function(error) {
    // An error happened.
  });
  
  
}
const handleChange = (event) =>{
    //console.log(event.target.name, event.target.value);
   let isFormValid = true;
   //let isfieldValid = true;
  
    if(event.target.name==='email'){
      isFormValid=(/\S+@\S+\.\S+/.test(event.target.value));
    }
    if(event.target.name==='password'){
       isFormValid=(event.target.value.length>=6);
         
    }
    if(isFormValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
}
  const handleSubmit = (e) => {
      console.log(user);
  }
  
  return (
    <div className="App">
     <button onClick={handleSignIn}>Sign In</button>
     {
       user.isSignedIn && <div><p>Welcome, {user.name}</p>
                <p>Your email {user.email}</p>
                <img src={user.photo}></img>
       </div>
     }
     <button onClick={handleSignOut}>Sign Out</button>

     <h1>Our own authentication system</h1>
    <p>Email : {user.email}</p>
    <p>Password : {user.password}</p>
     <form>
     <input type="text" name="name" onBlur={handleChange} placeholder="Your Name" required/>
     <br/>
     <input type="text" name="email" onBlur={handleChange} placeholder="Your Email" required/>
     <br/>
     <input type="password" name="password" onBlur={handleChange} placeholder="your password" required/>
     <br />
     <button onClick={handleSubmit}>Submit</button>
     </form>
       
    </div>
  );
}

export default App;
