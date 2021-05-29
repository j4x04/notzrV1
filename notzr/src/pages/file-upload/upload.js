import './upload.css';
import React from 'react';
import {FormControl, FormLabel, Input, Box, Grid, IconButton} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { Button, ButtonGroup } from "@chakra-ui/react"
import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/database'
import '@firebase/storage';
import { Stack, InputGroup } from "@chakra-ui/react"
import { Checkbox, CheckboxGroup } from "@chakra-ui/react"
//import { useDeprecatedInvertedScale } from 'framer-motion';
import Navbar from '../components/Navbar.js'
import { Select } from "@chakra-ui/react"
import { getDisplayName } from 'next/dist/next-server/lib/utils';
//import { getValueTransition } from 'framer-motion/types/animation/utils/transitions';

class Upload extends React.Component {


  render() {
    function fileupload(){
      document.getElementById('fileget').click();
    }
    function fileupload2(){
      document.getElementById('fileget2').click();
    }
    return (
      <div style={{height: "1250px"}}>

        <div id="myModal" className="modal">
          <div className="modal-content">
            <p>Uploading, Please Wait</p>
          </div>
        </div>

        <Navbar/>
        <h1 style={{fontSize:"64px", textAlign: "left", marginLeft: "10%", marginTop: "5%"}}>UPLOAD</h1>
        <p style={{fontSize:"14px", textAlign: "left", marginLeft: "10%"}}>*Your Email and Login will be recorded with your upload!</p>
        <p style={{fontSize:"14px", textAlign: "left", marginLeft: "10%"}}>*Please note that you cannot manually delete files that you upload. </p>
        <p style={{fontSize:"14px", textAlign: "left", marginLeft: "10%"}}>*If you have any problems uploading, or have a deletion request, email notzr.help@gmail.com. </p>
        <div style={{backgroundColor: "white", float: "right", height: "600px", width: "100px", position: "absolute", right: "0%", zIndex: "1"}}></div>
        <Stack spacing={3}>
          <div style={{marginLeft: "9.5%", marginTop: "3%"}}>
            <p style={{float: "left", padding:"10px"}}>Title: </p>
            <Input id="title" placeholder="unit name, teacher" size="lg" style={{width: "60%", float: "left", marginLeft: "6%"}}/>
          </div>
          <div style={{marginLeft: "9.5%", marginTop: "3%"}}>
            <p style={{float: "left", padding:"10px"}}>Author: </p>
            <Input id="name" placeholder="full name ('Anon' if anonymous)" size="lg" style={{width: "60%", float: "left", marginLeft: "4.6%"}}/>
          </div>
          <div style={{marginLeft: "9.5%", marginTop: "3%"}}>
            <p style={{float: "left", padding:"10px"}}>Description: </p>
            <Input id = "description" placeholder="purpose, any obvious errors" size="lg" style={{width: "60%", float: "left", marginLeft: "2%"}}/>
          </div>
          <div style={{marginLeft: "9.5%", marginTop: "3%"}}>
            <p style={{float: "left", padding:"10px"}}>Level: </p>
            <Select id = "type" placeholder="select HL/SL" size="lg" style={{width: "60%", float: "left", marginLeft: "6%"}}>
              <option value="SL">SL</option>
              <option value="HL">HL</option>
            </Select>
          </div>
          <div style={{marginLeft: "9.5%", marginTop: "3%"}}>
            <p style={{float: "left", padding:"10px"}}>Course: </p>
            <Select id = "course" placeholder="select course" size="lg" style={{width: "60%", float: "left", marginLeft: "4.8%"}}>
              <option value="SL">English: Literature</option>
              <option value="HL">English: Language and Literature</option>
              <option value="SL">Spanish ab Initio</option>
              <option value="SL">Latin</option>
              <option value="SL">French</option>
              <option value="SL">Mandarin</option>
              <option value="SL">Economics</option>
              <option value="SL">Geography</option>
              <option value="SL">Global Politics</option>
              <option value="SL">History</option>
              <option value="SL">Philosophy</option>
              <option value="SL">Biology</option>
              <option value="SL">Chemistry</option>
              <option value="SL">Computer Science</option>
              <option value="SL">Physics</option>
              <option value="SL">Sports, Exercise, and Health Science</option>
              <option value="SL">Mathematics: Analysis and Approaches</option>
              <option value="SL">Mathematics: Applications and Interpretation</option>
              <option value="SL">Dance</option>
              <option value="SL">Film</option>
              <option value="SL">Music</option>
              <option value="SL">Theatre</option>
              <option value="SL">Visual Arts</option>
              <option value="SL">Theory of Knowledge</option>
            </Select>
          </div>
          <div style={{marginLeft: "9.5%", marginTop: "3%"}}>
            <p style={{float: "left", padding:"10px"}}>School: </p>
            <Input id = "school" placeholder="full (e.g. Upper Canada College)" size="lg" style={{width: "60%", float: "left", marginLeft: "5%"}}/>
          </div>
      </Stack>
      <div style={{marginTop: "3%", float: "left", marginLeft: "10%"}}>
          <p style={{float: "left", clear: "left"}}>Notes: </p>
          <IconButton
                  w = {300}
                  h = {150}
                  position = "absolute"
                  marginTop = "4%"
                  left = "10%"
                  variant="solid"
                  bg="white"
                  border = "solid"
                  borderColor = "#54bb79"
                  borderWidth = "1px"
                  icon={<AddIcon/>}
                  id="file"
                  onClick={fileupload}>Open</IconButton>
          <input id="fileget" type="file" accept=".pdf" style={{display: "none", width: "0px", height: "0px"}} onChange={function(){var filevar = document.getElementById('fileget').files[0].name; document.getElementById("getname").innerHTML = filevar;}}></input>
        <p id="getname" style={{marginTop: "15%", textAlign: "left", wordWrap: "break-word", width: "300px", position: "absolute"}}>no notes selected</p>
        </div>
        <div style={{marginTop: "3%", float: "left", marginLeft: "9.5%", width: "800px"}}>
          <p style={{float: "left", marginLeft: "33%"}}>Thumbnail (screenshot of first page, optional): </p>
          <IconButton
                  w = {300}
                  h = {150}
                  position = "absolute"
                  marginTop = "4%"
                  left = "41%"
                  variant="solid"
                  bg="white"
                  border = "solid"
                  borderColor = "#54bb79"
                  borderWidth = "1px"
                  icon={<AddIcon/>}
                  id="file"
                  onClick={fileupload2}>Open</IconButton>
                  <input id="fileget2" type="file" accept=".jpg,.png,.jpeg,.gif,.HEIC" style={{display: "none"}} onChange={function(){var filevar = document.getElementById('fileget2').files[0].name; document.getElementById("getname2").innerHTML = filevar;}}></input>
                  <p id="getname2" style={{marginTop: "15%", textAlign: "left", marginLeft: "18%", wordWrap: "break-word", width: "300px", position: "absolute"}}>no thumbnail selected</p>
        </div>
        <Button id="button" size="lg" style={{float: "left", clear:"left", position: "static", marginTop: "20%", marginLeft: "9.5%", width: "20%", backgroundColor: "#54bb79", color: "white"}}>SUBMIT</Button>
        <div id="snackbar">Uploaded!</div>
      </div>
    );
  }
  componentDidMount(){
    var fileval = document.getElementById("file");
    var x = 0;
    const config = {
      apiKey: "AIzaSyC5nFzyJmNWF55RdiMcsIdwCSPaxLn8K20",
      authDomain: "notzr-3e7ee.firebaseapp.com",
      projectId: "notzr-3e7ee",
      storageBucket: "notzr-3e7ee.appspot.com",
      messagingSenderId: "304817540649",
      appId: "1:304817540649:web:4f0d4d46e1ab2656391638",
      measurementId: "G-5N6FL0TY6W",
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }else {
      firebase.app();
    }

    var emailvar = "";
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        emailvar = firebase.auth().currentUser.email;
      }
      else {
        window.alert("you are not logged in!")
      }
    });

    
    document.getElementById("button").addEventListener("click", function() {

      var titlevar = document.getElementById("title").value;
      var namevar = document.getElementById("name").value;
      var descriptionvar = document.getElementById("description").value;
      var today = new Date();
      var datevar = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var levelvar = document.getElementById("type");
      levelvar = levelvar.options[levelvar.selectedIndex].text;
      var coursevar = document.getElementById("course");
      coursevar = coursevar.options[coursevar.selectedIndex].text;
      var schoolvar = document.getElementById("school").value;
      var filevar = document.getElementById('fileget').files[0];
      var thumbnailvar = document.getElementById('fileget2').files[0];

      
      if(levelvar == "select HL/SL" || coursevar == "select course") { // MAKE SURE COURSE IS SELECTED
        alert("please fill out all required fields");
      } else if(titlevar == "" || namevar == "" || schoolvar == "" || filevar === undefined ) { // MAKING SURE TITLE/NAME/SCHOOL/FILE ARE FILLED
        alert("please fill out all required fields")
      } else {
 // ^^ MAKING SURE ALL FIELDS ARE FILLED 
        var thumbName = "defaultThumbnail22483.png"; 
        if(thumbnailvar === undefined) {
          thumbName = "defaultThumbnail22483.png" // if no thumbnail, set name to default
        } else {
          thumbName = thumbnailvar.name; // set name to thumbnail file name 
        }

        var existingNameArray = [];
        firebase.storage().ref("").listAll().then(function(result) { 
          result.items.forEach(function(item) { // loop all files in storage
            //console.log(item.name);
            existingNameArray.push(item.name); // push file names into array
          });// storage ref close
        }).then((snapshot) => { // upload
          if(thumbName != "defaultThumbnail22483.png" && existingNameArray.includes(thumbName)) { // MAKING SURE NO DUPLICATES OF THUMBNAIL NAME
            alert("this file name is already taken, please rename your thumbnail")
          } else if (existingNameArray.includes(filevar.name)) { // MAKING SURE NO PDF NOTES DUPLICATE NAMES
            alert("this file name is already taken, please rename your notes pdf")
          } else {


            if(thumbnailvar === undefined) {
              console.log("no thumbnail");
            } else firebase.storage().ref(thumbnailvar.name).put(thumbnailvar); // upload thumbnail;
        
  
            if(descriptionvar == "") descriptionvar = "N/A"; // set description to N/A if not filled out
            else;
  
  
  
            var firstid = firebase.database().ref('notes').push({ // push
                title: titlevar,
                name: namevar,
                description: descriptionvar,
                date: datevar,
                course: levelvar+" "+coursevar,
                school: schoolvar,
                file: filevar.name,
                thumbnail: thumbName, 
                email: emailvar
            }).catch(function(error) {
                alert("Notes could not be sent" + error); // error pushing
            });
  
            var x = document.getElementById("snackbar");
            x.className = "show"; // upload indicator
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000); // upload indicator
  
            document.getElementById("myModal").style.display = "block"; // upload indicator
  
            
            firebase.storage().ref(filevar.name).put(filevar).then((snapshot) => { // upload
              window.location.replace("/catalogue"); // redirect after upload
            });


          }//close else
        });//close .then from duplicate check



    } // checking for missing input close

    }); // event listener close
  }// componnetdidmount close 
} // class close

export default Upload;