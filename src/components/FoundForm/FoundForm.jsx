import React from "react"
import useStore from "../../zustand/store";
import { useState } from "react";
import UploadWidget from './UploadWidget';
import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { useParams } from "react-router-dom";
import './FoundForm.css';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

function FoundForm() {
  const params = useParams();
  const [dateInput, setDateInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [photoInput, setPhotoInput] = useState('');
  const navigate = useNavigate();
  const fetchPlant= useStore((state) => state.fetchPlant);

  //----CLOUDINARY INFO----//

    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'dwqjkxlqe'
      }
    });

      // Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
  const myImage = cld.image('docs/result.info.public_id'); 

  // Resize to 250 x 250 pixels using the 'fill' crop mode.
  myImage.resize(fill().width(150).height(150));




  //----REGULAR FORM INFO----//

  const addItem = useStore((store) => store.addItem);


  const formHandler = (event) => {
    event.preventDefault();
    
    const newItem = {
        item_id: params.itemId,
        found_date: dateInput,
        location: locationInput,
        description: descriptionInput,
        photo: photoInput,
    }

    console.log('New object', newItem);
    
    //Below is the photo 
    //result.info.public_id

    addItem(newItem);

    setDateInput('');
    setLocationInput('');
    setDescriptionInput('');
    setPhotoInput('');

    // navigate('/found');
  };

//This function is just going back a page
  const noMas = () => {
    navigate(-1)
  };
  

  return (
    <div id='background' >
      <h3>Welcome to the found form!</h3>
      <section>
        <form id="form" onSubmit={formHandler}>

          {/* found date */}
          <input type="text" placeholder="Found date" value={dateInput}  onChange={(e) => setDateInput(e.target.value)}/>

          {/* location */}
          <input type="text" placeholder="Location found" value={locationInput}  onChange={(e) => setLocationInput(e.target.value)}/>

          {/* Description/journal entry */}
          <input type="text" style={{
        width: '300px',
        height: '100px',
        fontSize: '16px',
        padding: '10px',
      }} placeholder="Description" value={descriptionInput}  onChange={(e) => setDescriptionInput(e.target.value)}/>


          <br />

          {/* This line of code renders the pop up widget tool to upload their photo to cloudinary */}
         
          <br />

          {/* Check to see if this actually renders the info for the public_id.. This may need to be changed */}
          <Stack direction="horizontal" gap={3}>
          <Form.Control className="me-auto" placeholder="Photo url.." /> {/* figure out how to put the url into this text box*/}
          <UploadWidget setPhotoInput={setPhotoInput}/>          <div className="vr" />
          <Button variant="danger">Reset</Button>
          </Stack>
          {photoInput}
         {photoInput && <img id="uploadedPhoto" src={photoInput} height={200} width={200} />}
        
          <br />
          
          <Button variant="dark" type='submit' >Submit</Button>
          <br />
        </form>
        <br />
      </section>
      <Button id='cancelButton' variant="dark" type='button' onClick={noMas}>Cancel</Button>
    </div>
  )
};

export default FoundForm;
