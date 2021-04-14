import { Box } from "@chakra-ui/react"
import './dashboard.css';
import Navbar from '../components/Navbar.js'


import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/database'
import '@firebase/storage';

  
  

var list = [];
function Dash(){
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
  query.once("value").then(function(snapshot){
    snapshot.forEach(function(childSnapshot){
      var key = childSnapshot.ref.path.pieces_[1];
      if(list.length==0){
        document.getElementById("loadcatalogue").innerHTML="";
      }
      if(list.indexOf(key) == -1){
        document.getElementById("loadcatalogue").innerHTML += "<div id="+key+"><a href='./view' target=target='_blank'>"+childSnapshot.child("title").val()+"</a></div>";
        document.getElementById("loadcatalogue").innerHTML += "<br>";
        list.push(key);
        //console.log(document.getElementById(key))

        //document.getElementById(key).addEventListener("click", function() {getFile(key)});
      }
    })
    for(var i = 0; i < list.length; i++){
      console.log(list[i])
      document.getElementById(list[i]).addEventListener("click", function() {
        localStorage.setItem('notes',this.id);
        console.log(this.id);
      });
    }
})
function getFile(key){
}
  return (
    <div>
        <Navbar/>
        <div className="Catalogue">
            <div id="loadcatalogue" style={{margin: '30px'}}></div>
        </div>
    </div>
  );
}

export default Dash;