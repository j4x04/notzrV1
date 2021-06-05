
import './catalogue.css';
import Navbar from '../components/Navbar.js'
import React, { useState, useEffect } from "react";

import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/database'
import '@firebase/storage';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
  
  
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




//auth
var LoginButtonName = "Sign In";
const [buttonName, setButtonName] = useState("Sign In");
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    setButtonName("Hello, " + firebase.auth().currentUser.displayName+"!");
    //console.log(LoginButtonName);
  }
  else {
    setButtonName("Log In");
  }
});




var storage = firebase.storage();
var thumbnail = "";
var thumbnailref = "";
var storageRef = storage.ref();

var numnotes = [];
for(var i = 0; i < 24; i++){
  numnotes.push(0);
}

var query = firebase.database().ref("notes").orderByKey();
  query.once("value").then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var key = childSnapshot.ref.path.pieces_[1];
          if(list.length==0){
            document.getElementById("myUL").innerHTML = "";
          }
          if(list.indexOf(key) == -1){
            var title = childSnapshot.child("title").val();
            var levelcourse = childSnapshot.child("course").val();
            var level = levelcourse.split(" ")[0];
            var course = levelcourse.substring(level.length+1);
            //console.log(course);
            var getid = "";
            if(course == "English: Literature"){
              getid += "1";
            }
            else if(course == "English: Language and Literature"){
              getid += "2";
            }
            else if(course == "Spanish ab Initio"){
              getid += "3";
            }
            else if(course == "Latin"){
              getid += "4";
            }
            else if(course == "French"){
              getid += "5";
            }
            else if(course == "Mandarin"){
              getid += "6";
            }
            else if(course == "Economics"){
              getid += "7";
            }
            else if(course == "Geography"){
              getid += "8";
            }
            else if(course == "Global Politics"){
              getid += "9";
            }
            else if(course == "History"){
              getid += "10";
            }
            else if(course == "Philosophy"){
              getid += "11";
            }
            else if(course == "Biology"){
              getid += "12";
            }
            else if(course == "Chemistry"){
              getid += "13";
            }
            else if(course == "Computer Science"){
              getid += "14";
            }
            else if(course == "Physics"){
              getid += "15";
            }
            else if(course == "Sports, Exercise, and Health Science"){
              getid += "16";
            }
            else if(course == "Mathematics: Analysis and Approaches"){
              getid += "17";
            }
            else if(course == "Mathematics: Applications and Interpretation<"){
              getid += "18";
            }
            else if(course == "Dance"){
              getid += "19";
            }
            else if(course == "Film"){
              getid += "20";
            }
            else if(course == "Music"){
              getid += "21";
            }
            else if(course == "Theatre"){
              getid += "22";
            }
            else if(course == "Visual Arts"){
              getid += "23";
            }
            else if(course == "Theory of Knowledge"){
              getid += "24";
            }
          
            getid += level;
            thumbnailref = storageRef.child(childSnapshot.child("thumbnail").val());
            thumbnail = getthumbnail(function(){
              if(document.getElementById(getid).innerHTML.indexOf("No notes yet!") > -1){
                document.getElementById(getid).innerHTML = "";
              }
              if(title.length > 57){
                title = title.substring(0, 52)+"..."
              }
              console.log(title);
                document.getElementById(getid).innerHTML += "<div class='column'><div class='"+key+"'>"+title+"<img class='"+key+"' style='border: solid; border-width: 1px; object-fit: cover; border-color: grey; height: 450px; width: 80%; margin-left: 10%; margin-bottom: 8%' src='"+thumbnail+"'}></img>"
                document.getElementById(getid).innerHTML += ""
                document.getElementById(getid).innerHTML += "</div></div>"
              });
            document.getElementById("myUL").innerHTML += "<li><a class="+key+">"+title+"</a></li>"
            list.push(key);
          }
      })
      const SLTabs = document.getElementById("SLTabs");
      SLTabs.scrollLeft = 600;
})
async function getthumbnail(callback){
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

useEffect(() => {
  setTimeout(function(){
    document.addEventListener('click', function (event) {
      console.log(event.target.className);
      if (list.indexOf(event.target.className) > -1) {
        localStorage.setItem('notes', event.target.className);
        window.open("/view");
        console.log("passed");
      }
    }, false);
  }, 1);
}, []);

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
      li[i].style.display = "block";
    } else {
      li[i].style.display = "none";
    }
  }
}
  return (
    <div>
        <Navbar buttonName = {buttonName}/>
        <h1 style={{fontSize:"32px", textAlign: "left", marginLeft: "3%", marginTop: "7%"}}>SEARCH</h1>
        <p style={{fontSize:"14px", textAlign: "left", marginLeft: "3%"}}>Search to find student-written notes for all standardized IB courses.</p>
        <p style={{fontSize:"14px", textAlign: "left", marginLeft: "3%"}}>Upload notes to help other IB students! Refer to our support document below.</p>
        <a style={{fontSize:"14px", textAlign: "left", float:"left", marginLeft:"3%",color:"#0645AD", textDecoration: "underline"}} target="_blank" href = "https://docs.google.com/document/u/1/d/1dTCTipD1pHN_WLt2zQPoy4oWirgL9mkWxsLAQpHdgsE/edit?usp=sharing">NOTZR SUPPORT GUIDE</a>
        <input id="myInput" onKeyUp={getNotesList} placeholder="Search for Notes (Scroll)"></input>
        <ul id="myUL">
        </ul>
        <h1 style={{fontSize:"32px", textAlign: "left", marginLeft: "3%", marginTop: "3%"}}>HL CATALOGUE</h1>
          <div style={{marginTop: "2%", marginLeft:"3%", width:"94%", borderWidth:"1px", borderColor:"#cccaca"}}>
        <Tabs defaultIndex={6}>
          <TabList style={{overflowX: "scroll", overflowY: "hidden"}}>
            <Tab>English: Literature</Tab>
            <Tab>English: Language and Literature</Tab>
            <Tab>Spanish ab Initio</Tab>
            <Tab>Latin</Tab>
            <Tab>French</Tab>
            <Tab>Mandarin</Tab>
            <Tab>Economics</Tab>
            <Tab>Geography</Tab>
            <Tab>Global Politics</Tab>
            <Tab>History</Tab>
            <Tab>Philosophy</Tab>
            <Tab>Biology</Tab>
            <Tab>Chemistry</Tab>
            <Tab>Computer Science</Tab>
            <Tab>Physics</Tab>
            <Tab>Sports, Exercise, and Health Science</Tab>
            <Tab>Mathematics: Analysis and Approaches</Tab>
            <Tab>Mathematics: Applications and Interpretation</Tab>
            <Tab>Dance</Tab>
            <Tab>Film</Tab>
            <Tab>Music</Tab>
            <Tab>Theatre</Tab>
            <Tab>Visual Arts</Tab>
            <Tab>Theory of Knowledge</Tab>
          </TabList>

          <TabPanels style={{display: "table"}}>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>English: Literature</h1>
              <div id="1HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>English: Language and Literature</h1>
              <div id="2HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Spanish ab Initio</h1>
              <div id="3HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Latin</h1>
              <div id="4HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>French</h1>
              <div id="5HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Mandarin</h1>
              <div id="6HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Economics</h1>
              <div id="7HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Geography</h1>
              <div id="8HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Global Politics</h1>
              <div id="9HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>History</h1>
              <div id="10HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Philosophy</h1>
              <div id="11HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Biology</h1>
              <div id="12HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Chemistry</h1>
              <div id="13HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Computer Science</h1>
              <div id="14HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Physics</h1>
              <div id="15HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Sports, Exercise, and Health Science</h1>
              <div id="16HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Mathematics: Analysis and Approaches</h1>
              <div id="17HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Mathematics: Applications and Interpretation</h1>
              <div id="18HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Dance</h1>
              <div id="19HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Film</h1>
              <div id="20HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Music</h1>
              <div id="21HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Theatre</h1>
              <div id="22HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Visual Arts</h1>
              <div id="23HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Theory of Knowledge</h1>
              <div id="24HL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
          </TabPanels>
        </Tabs>
    </div>
    
    <h1 style={{fontSize:"32px", textAlign: "left", marginLeft: "3%", marginTop: "3%"}}>SL CATALOGUE</h1>
          <div style={{marginTop: "2%", marginLeft:"3%", width:"94%", borderWidth:"1px", borderColor:"#cccaca", marginBottom: "3%"}}>
        <Tabs defaultIndex={16}>
          <TabList id="SLTabs" style={{overflowX: "scroll", overflowY: "hidden"}}>
            <Tab>English: Literature</Tab>
            <Tab>English: Language and Literature</Tab>
            <Tab>Spanish ab Initio</Tab>
            <Tab>Latin</Tab>
            <Tab>French</Tab>
            <Tab>Mandarin</Tab>
            <Tab>Economics</Tab>
            <Tab>Geography</Tab>
            <Tab>Global Politics</Tab>
            <Tab>History</Tab>
            <Tab>Philosophy</Tab>
            <Tab>Biology</Tab>
            <Tab>Chemistry</Tab>
            <Tab>Computer Science</Tab>
            <Tab>Physics</Tab>
            <Tab>Sports, Exercise, and Health Science</Tab>
            <Tab>Mathematics: Analysis and Approaches</Tab>
            <Tab>Mathematics: Applications and Interpretation</Tab>
            <Tab>Dance</Tab>
            <Tab>Film</Tab>
            <Tab>Music</Tab>
            <Tab>Theatre</Tab>
            <Tab>Visual Arts</Tab>
            <Tab>Theory of Knowledge</Tab>
          </TabList>

          <TabPanels style={{display: "table"}}>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>English: Literature</h1>
              <div id="1SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>English: Language and Literature</h1>
              <div id="2SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Spanish ab Initio</h1>
              <div id="3SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Latin</h1>
              <div id="4SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>French</h1>
              <div id="5SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Mandarin</h1>
              <div id="6SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Economics</h1>
              <div id="7SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Geography</h1>
              <div id="8SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Global Politics</h1>
              <div id="9SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>History</h1>
              <div id="10SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Philosophy</h1>
              <div id="11SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Biology</h1>
              <div id="12SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Chemistry</h1>
              <div id="13SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Computer Science</h1>
              <div id="14SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Physics</h1>
              <div id="15SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Sports, Exercise, and Health Science</h1>
              <div id="16SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Mathematics: Analysis and Approaches</h1>
              <div id="17SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Mathematics: Applications and Interpretation</h1>
              <div id="18SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Dance</h1>
              <div id="19SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Film</h1>
              <div id="20SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Music</h1>
              <div id="21SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Theatre</h1>
              <div id="22SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Visual Arts</h1>
              <div id="23SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
            <TabPanel>
              <h1 style={{fontSize:"24px", marginTop: "2%", marginBottom: "2%", color: "#54bb79"}}>Theory of Knowledge</h1>
              <div id="24SL">No notes yet! Please consider contributing by uploading your own</div>
            </TabPanel>
          </TabPanels>
        </Tabs>
    </div>
      <div style={{marginBottom: "2%", fontSize: "10px"}}>a project by Leo Zhang and Joshua Li</div>
    </div>
  );
}


export default Catalogue;