import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";

import "./PlaceForm.css"; 


const DUMMY_PLACES = [
    {
      id: "p1",
      title: "Empire State Building",
      description: "One of the most famous sky scrapers in the world",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg",
      address: "20 W 34th St, New York, NY 10001",
      location: {
        lat: 40.7484405,
        lng: -73.9878584,
      },
      creator: "u1",
    },
    {
      id: "p2",
      title: "Empire State Building",
      description: "One of the most famous sky scrapers in the world",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg",
      address: "20 W 34th St, New York, NY 10001",
      location: {
        lat: 40.7484405,
        lng: -73.9878584,
      },
      creator: "u2",
    },
  ];

const UpdatePlace = () => {
    const placeId = useParams().placeId;
    const[isLoading, setIsLoading] = useState(true);
    const[formState, inputHandler, setFormData] = useForm(
    {
      title : {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    }, 
    false
  );

  const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

  useEffect(()=>{
    if(identifiedPlace){
      setFormData({
        title : {
          value: identifiedPlace.value,
          isValid: true
      },
        description: {
          value: identifiedPlace.description,
          isValid: true
      }}
      ,true);
    }
    
    setIsLoading(false);

  }, [setFormData, identifiedPlace]);
  
  

    const placeUpdateSubmitHandler = event =>{
      event.preventDefault();
      console.log(formState.inputs);
    }
    if(isLoading){
        return (
            <div className="center">
              <Card>
                <h2>Could Not Find Place</h2>
              </Card>
            </div>
        )
    }
    if(!formState.inputs.title.value){
      return (
        <div className="center">
            <h2>Loading</h2>
        </div>
    );
}
    
    return (
     
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <Input
            id= 'title'
            element= "input"
            type="text"
            label="title"
            onInput = {inputHandler}
            validators={[VALIDATOR_REQUIRE()]} 
            errorText="Please enter a valid title."
            initialValue = {formState.inputs.title.value}
            initialValid  = {formState.inputs.title.isValid}
            />

        <Input
            id= 'description'
            element= "textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH()]} 
            errorText="Please enter a valid description (min. 5 characters)."
            onInput = {inputHandler}
            initialValue = {formState.inputs.description.value}
            initialValid = {formState.inputs.description.isValid}
            />
      <Button type="submit" disabled ={!formState.isValid}>Update Place</Button>
    </form>
      
    

    );
}

export default UpdatePlace;