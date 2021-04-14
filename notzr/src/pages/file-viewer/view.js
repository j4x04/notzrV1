import { Box } from "@chakra-ui/react"
import './view.css';
import Navbar from '../components/Navbar.js'

import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/database'
import '@firebase/storage';

function View() {
  const config = {
    apiKey: "AIzaSyC5nFzyJmNWF55RdiMcsIdwCSPaxLn8K20",
    authDomain: "notzr-3e7ee.firebaseapp.com",
    projectId: "notzr-3e7ee",
    storageBucket: "notzr-3e7ee.appspot.com",
    messagingSenderId: "304817540649",
    appId: "1:304817540649:web:4f0d4d46e1ab2656391638",
    measurementId: "G-5N6FL0TY6W",
  };
  //initialization
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }else {
    firebase.app();
  }
  var storage = firebase.storage();
  var storageRef = storage.ref();
  var query = firebase.database().ref("notes").orderByKey();
  //console.log(query.limitToFirst(1))
  query.equalTo("-MPk8IFkA1JJKQSWqfXy").once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          document.getElementById('schoolcourse').innerHTML = childSnapshot.child('school').val()+": "+ childSnapshot.child('course').val();
          document.getElementById('title').innerHTML = childSnapshot.child('title').val();
          document.getElementById('name').innerHTML = "by: " + childSnapshot.child('name').val();
          document.getElementById('description').innerHTML = childSnapshot.child('description').val();
          document.getElementById('date').innerHTML = childSnapshot.child('date').val();

          //console.log(childSnapshot)

          var docRef = storageRef.child(childSnapshot.child('file').val());
          docRef
            .getDownloadURL()
            .then(function (urlstore) {
              //`urlstore` is the download URL
              var xhr = new XMLHttpRequest();
              xhr.responseType = "blob";
              xhr.onload = function (event) {
                var blob = xhr.response;
              }; 
              xhr.open("GET", urlstore);
              xhr.send();
              document.getElementById('notes').src = urlstore;
            })
            .catch(function (error) {
              console.log("error in calling file")
            });
        })
      })
      .catch(function(error){
        console.log("error in calling database")
      })

  return (
    <div>
        <Navbar/>
        <div className="App">
            <div className="line" style={{marginTop:"2%", width:"100%"}}></div>
            <iframe id="notes" style={{position: 'static', float: 'left'}} height='755px' width='70%' title='Notes'></iframe>
            <div class="right-container">
                <p id="schoolcourse" style = {{marginTop:"12%"}}></p>
                <h1 id="title" style = {{textDecoration: "underline"}}></h1>
                <p id="description" style = {{marginTop:"0", padding:"10px"}}></p>
                <p id="name" style = {{marginTop:"-2%", fontSize:"15px"}}></p>
                <p id="date" style = {{marginTop:"0", fontSize:"12px"}}></p>
            </div>
        </div>
    </div>

  );
}
export default View;