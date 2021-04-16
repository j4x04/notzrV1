
import React from 'react';
import './navbar.css';



import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/database'
import '@firebase/storage';





function Navbar(props) {
  
  var LoginButtonName = "Sign In";




  function signIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) { 
        window.location.replace("/catalogue");
    });
  }

  
  function redirectUpload() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        window.location.replace("/upload");
      } else {
        window.alert("Please Sign in to Upload Notes");
      }
    });
  }
 

  

  return (
    <div className="navbar">
      <button className = "left" onClick={() => window.location.replace("/catalogue")}>Home</button>
      <button onClick={() => redirectUpload()}>Upload</button>
      <button className = "login" onClick = {() => signIn()} id = "login">{props.buttonName}</button>
    </div>
  )

}



export default Navbar;