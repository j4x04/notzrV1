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
import { PinInput, PinInputField } from "@chakra-ui/react"
import { useDeprecatedInvertedScale } from 'framer-motion';
import Navbar from './components/Navbar.js'


class Upload extends React.Component {



  render() {
    function fileupload(){
      document.getElementById('fileget').click();
        }
    return (
      <Box bg = "#ADD8E6" h = {1300}>
        <Navbar/>
        <Grid templateColumns="repeat(2, 1fr)" gap={2} > 
            <Box p = {3} w = {700} ml = {30} mt = {30}>

              <FormControl isRequired>

                <Box mt = {35} boxShadow="base" p="6" rounded="md" bg = "#54bb79">
                  <FormLabel>Title</FormLabel>
                  <Input id = "title"/>
                </Box> 
                
                <Box mt = {35} boxShadow="base" p="6" rounded="md" bg = "#FFFFFF">
                  <FormLabel>Description</FormLabel>
                  <Input id = "description"/>
                </Box> 
                <Box mt = {35} boxShadow="base" p="6" rounded="md" bg = "#FFFFFF">
                  <FormLabel>Date</FormLabel>
                  <PinInput defaultValue="MMDDYYYY" id="date">
                    <PinInputField />
                    <PinInputField />
                    <span> / </span>
                    <PinInputField />
                    <PinInputField />
                    <span> / </span>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </Box> 

                <Box mt = {35} boxShadow="base" p="6" rounded="md" bg = "#FFFFFF"> 
                  <FormLabel>Name</FormLabel>
                  <Input id = "name"/>
                </Box> 

                <Box mt = {35} boxShadow="base" p="6" rounded="md" bg = "#FFFFFF"> 
                  <FormLabel>Course</FormLabel>
                  <Input id = "course"/>
                </Box> 

                <Box mt = {35} boxShadow="base" p="6" rounded="md" bg = "#FFFFFF"> 
                  <FormLabel>School</FormLabel>
                  <Input id = "school"/>
                </Box> 

              </FormControl>

            </Box>
            
            <Box mt = {200} ml = {20}>
              <IconButton
                w = {500}
                h = {250}
                variant="solid"
                colorScheme="blue"
                aria-label="Send email"
                icon={<AddIcon/>}
                id="file"
                onClick={fileupload}>Open</IconButton>
              <input id="fileget" type="file" style={{display: "none"}}></input>
            </Box>

            <Button colorScheme="blue" mt={35} ml={10} id="button"> Button</Button>
        </Grid>
      </Box>
    );
  }

  componentDidMount(){
    var fileval = document.getElementById("file");
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
      var coursevar = document.getElementById("course").value;
      var schoolvar = document.getElementById("school").value;
      var datevar = document.getElementById("date").value;
      console.log(datevar);
      var descriptionvar = document.getElementById("description").value;
      var filevar = document.getElementById('fileget').files[0];
      var task = firebase.storage().ref(filevar.name).put(filevar);
      var firstid = firebase.database().ref('notes').push({
          title: titlevar,
          date: datevar,
          course: coursevar,
          description: descriptionvar,
          file: filevar.name,
          name: namevar,
          school: schoolvar,
      }).catch(function(error) {
          alert("Notes could not be sent" + error);
      });
    });
  }
}

export default Upload;