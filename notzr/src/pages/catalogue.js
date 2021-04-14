
import './catalogue.css';
import Navbar from './components/Navbar.js'

import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/database'
import '@firebase/storage';

  
  
var list = [];
function Catalogue(){
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
var thumbnail = "";
var thumbnailref = "";
var storageRef = storage.ref();
var query = firebase.database().ref("notes").orderByKey();
  query.once("value").then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var key = childSnapshot.ref.path.pieces_[1];
          if(list.length==0){
            document.getElementById("loadcatalogue").innerHTML = "";
            document.getElementById("myUL").innerHTML = "";
          }
          if(list.indexOf(key) == -1){
            var title = childSnapshot.child("title").val();
            thumbnailref = storageRef.child(childSnapshot.child("thumbnail").val());
              thumbnail = getthumbnail(function(){
                document.getElementById("loadcatalogue").innerHTML += "<div class='column'><Button class='"+key+"' colorScheme='blue'>"+title+"</Button><img src="+thumbnail+"></img></div>"
                
              });
            document.getElementById("myUL").innerHTML += "<li><a class="+key+">"+title+"</a></li>"
            list.push(key);
          }
      })
})
function getthumbnail(callback){
  thumbnailref
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
      thumbnail = urlstore;
      callback();
    })
    .catch(function (error) {
      console.log("error in calling file")
  });
}
/*
document.getElementById("-M1Mx_q10CmxxeQP703b").addEventListener("click", function(){
  localStorage.setItem('notes',1);
  console.log(1);
})
document.getElementById("-MPBN0v8L4KwIaMWPifL").addEventListener("click", function(){
  localStorage.setItem('notes',2);
  console.log(2);
})
*/
setTimeout(function(){
  document.addEventListener('click', function (event) {
    console.log(event.target.className);
    if (list.indexOf(event.target.className) > -1) {
      localStorage.setItem('notes', event.target.className);
      window.open("/view");
      console.log("passed");
    }
  }, false);
}, 3000);
function getNotesList() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

  return (
    <div>
        <Navbar/>
        <input id="myInput" onKeyUp={getNotesList} placeholder="Search for Notes"></input>
          <ul id="myUL">
          </ul>
        <div className="Catalogue" style={{marginTop: "2%"}}>
            <div id="loadcatalogue"></div>
        </div>
    </div>
  );
}


export default Catalogue;