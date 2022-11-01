import React, { useState, useContext } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {  VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";

import "./Authenticate.css"
import { useForm } from "../../shared/hooks/form-hook";

const Authenticate = ()=>{
     const auth = useContext(AuthContext);
     console.log("hey i am auth ", auth);
     const[isLoginMode, setIsLoginMode] = useState(true);

//     const inputHandler= () =>{
//     }
    const[formState, inputHandler, setFormData] = useForm({
     email: {
          value: '',
          isValid: false
     },
     password: {
          value: '',
          isValid: false
     }
    }, false);

    const authSubmitHandler = event =>{
     event.preventDefault();
     console.log(formState.inputs);
     auth.login();
    }

    const switchModeHandler = ()=>{
     if(!isLoginMode){ //if we are signing up AKA moving to login mode
          setFormData(
               {
               ...formState.inputs,
               //drop the name field, override name to undefined
               name: undefined 
          }, 
          formState.inputs.email.isValid && formState.inputs.password.isValid)
     }else { //if we are logging in AKA moving to signup mode
          setFormData({
               ...formState.inputs,
               name: {
                    value:'',
                    isValid: false
               }
          }, 
          false
          );
     }
     setIsLoginMode(prevMode => !prevMode);

    }
    return (
     <Card className='authentication'>
     <h2>Login Required</h2>
     <hr/>
     <form className="place-form" onSubmit={authSubmitHandler}>
     {!isLoginMode && <Input element='input' id="name" type="text" label='Your Name' validators={[VALIDATOR_REQUIRE()]} errorText="please enter a name" onInput={inputHandler}></Input>}
       <Input
            id= 'email'
            element= "input"
            type="email"
            label="E-mail"
            onInput = {inputHandler}
            validators={[VALIDATOR_EMAIL()]} 
            errorText="Please enter a valid email."
       />
       <Input
            id= 'password'
            element= "input"
            type="password"
            label="Password"
            onInput = {inputHandler}
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password, min length should be of 5 characters."
       />
       <Button type="submit" disabled = {!formState.isValid}>{isLoginMode? "Login" : "Signup"}</Button>
       </form>
       <Button  inverse onClick={switchModeHandler}>Switch to {isLoginMode ? "Signup" : "Login" } </Button>
     </Card>
    )
}

export default Authenticate;