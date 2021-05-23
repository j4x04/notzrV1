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
      <div style={{height: "1100px"}}>

        <div id="myModal" class="modal">
          <div class="modal-content">
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
            <p style={{float: "left", padding:"10px"}}>Name:</p>
            <Input id="name" placeholder="full name ('Anon' if anonymous)" size="lg" style={{width: "60%", float: "left", marginLeft: "5%"}}/>
          </div>
          <div style={{marginLeft: "9.5%", marginTop: "3%"}}>
            <p style={{float: "left", padding:"10px"}}>Description: </p>
            <Input id = "description" placeholder="purpose, any obvious errors" size="lg" style={{width: "60%", float: "left", marginLeft: "2%"}}/>
          </div>
          <div style={{marginLeft: "9.5%", marginTop: "3%"}}>
            <p style={{float: "left", padding:"10px"}}>Date: </p>
            <Input id = "date" placeholder="MM/DD/YYYY" size="lg" style={{width: "60%", float: "left", marginLeft: "6%"}}/>
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
        <div style={{marginTop: "3%", float: "left", marginLeft: "9.5%"}}>
          <p style={{float: "left", padding:"10px", paddingRight: "10%"}}>Notes: </p>
          <input type="file" id="fileget" style={{float: "left", padding:"10px", paddingRight: "10%"}}></input>
        </div>
        <div style={{marginTop: "3%", float: "left", marginLeft: "9.5%"}}>
          <p style={{float: "left", padding:"10px", paddingRight: "10%"}}>Thumbnail (screenshot of first page on PDF): </p>
          <input type="file" id="fileget2" style={{float: "left", padding:"10px", paddingRight: "10%"}}></input>
        </div>
        <Button id="button" size="lg" style={{float: "left", clear:"left", position: "static", marginTop: "2%", marginLeft: "9.5%", width: "20%", backgroundColor: "#54bb79", color: "white"}}>SUBMIT</Button>
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

    document.getElementById("button").addEventListener("click", function() {
      var titlevar = document.getElementById("title").value;
      var namevar = document.getElementById("name").value;
      var descriptionvar = document.getElementById("description").value;
      var datevar = document.getElementById("date").value;
      var levelvar = document.getElementById("type");
      levelvar = levelvar.options[levelvar.selectedIndex].text;
      var coursevar = document.getElementById("course");
      coursevar = coursevar.options[coursevar.selectedIndex].text;
      var schoolvar = document.getElementById("school").value;
      var filevar = document.getElementById('fileget').files[0];
      var thumbnailvar = document.getElementById('fileget2').files[0];
      
      firebase.storage().ref(thumbnailvar.name).put(thumbnailvar);
      
      var firstid = firebase.database().ref('notes').push({
          title: titlevar,
          name: namevar,
          description: descriptionvar,
          date: datevar,
          course: levelvar+" "+coursevar,
          school: schoolvar,
          file: filevar.name,
          thumbnail: thumbnailvar.name
      }).catch(function(error) {
          alert("Notes could not be sent" + error);
      });

      var x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

      document.getElementById("myModal").style.display = "block";

      
      firebase.storage().ref(filevar.name).put(filevar).then((snapshot) => {
        window.location.replace("/catalogue");
      });

    });
  }
}

export default Upload;