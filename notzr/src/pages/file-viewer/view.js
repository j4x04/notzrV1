import './view.css';

import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/database'
import '@firebase/storage';
import Navbar from '../components/Navbar.js'


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

  console.log(localStorage['notes'])
  var storage = firebase.storage();
  var storageRef = storage.ref();
  var query = firebase.database().ref("notes").orderByKey();
  //console.log(query.limitToFirst(1))
  query.equalTo(localStorage['notes']).once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          document.getElementById('school').innerHTML = childSnapshot.child('school').val();
          document.getElementById('course').innerHTML = childSnapshot.child('course').val()
          document.getElementById('title').innerHTML = childSnapshot.child('title').val();
          document.getElementById('name').innerHTML = "by " + childSnapshot.child('name').val();
          document.getElementById('description').innerHTML = childSnapshot.child('description').val();
          document.getElementById('date').innerHTML = childSnapshot.child('date').val();
          
          document.getElementById('notes').title = 'New title!';
          console.log(document.getElementById('notes').contentDocument.title);
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
        document.getElementById("notes").title = "yes";
      })
      .catch(function(error){
        console.log("error in calling database")
      })

  return (
    <div>
        <Navbar/>
        <div className="App">
            <div className="line" style={{marginTop:"2%", width:"100%"}}></div>
            <iframe id="notes" style={{position: 'static', float: 'left'}} height='739px' width='70%' title='Notes'></iframe>
            <div class="right-container">
                <p style={{fontSize:"12px", textAlign: "left", marginLeft: "10%", color: "#54bb79", marginTop: "12%"}}>Title</p>
                <h1 id="title" style = {{fontSize:"32px", textAlign: "left", marginLeft: "10%", fontWeight:"bold"}}></h1>
                <p id="name" style = {{fontSize:"18px", textAlign: "right", marginRight: "10%"}}></p>
                <hr style = {{marginLeft: "10%", marginRight: "10%", marginTop: "2%", marginBottom: "2%"}}></hr>
                <p style={{fontSize:"12px", textAlign: "left", marginLeft: "10%", color: "#54bb79"}}>School</p>
                <p id="school" style = {{fontSize:"18px", textAlign: "left", marginRight: "10%", marginLeft: "10%"}}></p>
                <hr style = {{marginLeft: "10%", marginRight: "10%", marginTop: "2%", marginBottom: "2%"}}></hr>
                <p style={{fontSize:"12px", textAlign: "left", marginLeft: "10%", color: "#54bb79"}}>Course</p>
                <p id="course" style = {{fontSize:"18px", textAlign: "left", marginLeft: "10%"}}></p>
                <hr style = {{marginLeft: "10%", marginRight: "10%", marginTop: "2%", marginBottom: "2%"}}></hr>
                <p style={{fontSize:"12px", textAlign: "left", marginLeft: "10%", color: "#54bb79"}}>Description</p>
                <p id="description" style = {{fontSize:"18px", textAlign: "left", marginRight: "10%", marginLeft: "10%"}}></p>
                <hr style = {{marginLeft: "10%", marginRight: "10%", marginTop: "2%", marginBottom: "2%"}}></hr>
                <p style={{fontSize:"12px", textAlign: "left", marginLeft: "10%", color: "#54bb79"}}>Date</p>
                <p id="date" style = {{fontSize:"18px", textAlign: "left", marginLeft: "10%"}}></p>
            </div>
        </div>
    </div>

  );
}
export default View;