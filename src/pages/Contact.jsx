import React from "react"
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import {PhoneInput, isValidPhoneNumber} from 'react-phone-number-input'

//Contact form for customer support
export default function Contact(){
    const [successful, setSuccessful] = React.useState(false)
    const [modeChecked, setModeChecked] = React.useState({
        "email": false,
        "phone": false
    })
    const [values, setValues] = React.useState({
        "firstName": "",
        "lastName": "",
        "email": "",
        "phone":"",
        "kindOfRequest": "",
        "description": "",
        "modeOfContact": []
    })
    const [validValues, setValidValues] = React.useState({
        "firstName": false,
        "lastName": false,
        "email": false,
        "phone": false,
        "description": false
    })

    function handleSubmit(event){
        event.preventDefault()
        let isValid = true
        for (let field in validValues){
            isValid &= validValues[field]
        }
        return isValid ? setSuccessful(true) : setSuccessful(false)


    }

    function validName(value){
        return /^[A-Za-z]+$/.test(value)
    }

    function validDescription(value){
        return /^[A-Za-z ]+$/.test(value)
    }



    return (
        <div class="full">
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' , display: successful ? "none" : "block"},
                }}
                noValidate
                autoComplete="off"
                >
                <TextField
                    error= {!validValues.firstName} 
                    id="firstName" 
                    label="First Name" 
                    variant="standard"
                    helperText={!validValues.firstName? "Need a valid first name": ""}
                    onChange={(event) => {
                        setValidValues((prev) => {
                            return validName(event.target.value) && {...prev, firstName: true}
                        })
                        setValues(prev => {
                            return validValues.firstName && {...prev, firstName: event.target.value}
                        })
                    }}
                    required
                    />
                <TextField 
                    error={!validValues.lastName}
                    id="lastName" 
                    label="Last Name" 
                    variant="standard"
                    helperText={!validValues.lastName ? "Need a valid last name" : ""} 
                    onChange={(event) => {
                        setValidValues((prev) => {
                            return validName(event.target.value) && {...prev, lastName: true}
                        })
                        setValues(prev => {
                            return validValues.lastName && {...prev, lastName: event.target.value}
                        })
                    }}
                    required/>
                <TextField 
                    error={!validValues.email}
                    id="email" 
                    type="email" 
                    label="Email" 
                    variant="standard" 
                    helperText={!validValues.email ? "Need a valid email" : ""}
                    onChange={(event) => {
                        setValidValues((prev) => {
                            return event.target.validity.valid && {...prev, email: true}
                        })
                        setValues(prev => {
                            return validValues.email && {...prev, firstName: event.target.value}
                        })
                    }}
                    required/>
                <PhoneInput 
                    error={!validValues.phone}
                    id="phone" 
                    type="phone" 
                    label="Phone"
                    helperText={!validValues.phone ? "Need a valid phone number": ""}
                    onChange={(event) => {
                        setValidValues((prev) => {
                            return isValidPhoneNumber(event.target.value) && {...prev, phone: true}
                        })
                        setValues(prev => {
                            return validValues.phone && {...prev, phone: event.target.value}
                        })
                    }}
                    required/>
                <FormControl>
                    <FormLabel id="typeOfRequest">Type of Request</FormLabel>
                    <RadioGroup
                        aria-labelledby="typeOfRequest"
                        required
                        defaultValue="question"
                        name="typeOfRequest"
                        onChange = {(event) => {
                            setValues(prev => ({...prev, kindOfRequest: event.target.value}))
                        }}
                    >
                        <FormControlLabel value="question" control={<Radio />} label="Question" />
                        <FormControlLabel value="defect" control={<Radio />} label="Defect" />
                        <FormControlLabel value="feedback" control={<Radio />} label="Feedback" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                <TextField 
                    error= {!validValues.description} 
                    id="description" 
                    label="Description of Request" 
                    variant="standard"
                    helperText={!validValues.description? "Need a valid description of only letters and spaces": ""}
                    onChange={(event) => {
                        setValidValues((prev) => {
                            return validDescription(event.target.value) && {...prev, description: true}
                        })
                        setValues(prev => {
                            return validValues.description && {...prev, description: event.target.value}
                        })
                    }}
                    required/>
                <FormControl
                    required
                    error={values.modeOfContact.length < 1}
                    component="fieldset"
                    sx={{ m: 3 }}
                    variant="standard"
                >
                    <FormLabel id="modeOfContact">Mode of Contact</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                            <Checkbox 
                                checked={checked.email} 
                                onChange={(event) => {
                                    setModeChecked(prev => ({...prev, email: event.target.checked}))
                                    setValues(prev => {
                                        if (modeChecked.email){
                                            return [...prev, "email"]
                                        }else if (!modeChecked.email && prev.indexOf("email") !== -1){
                                            return prev.splice(prev.indexOf("email"), 1)
                                        }
                                    })
                                }} 
                                name="modeOfContact" 
                                value="email"/>
                            }
                            label="Email"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox 
                            checked={checked.phone} 
                            onChange={(event) => {
                                setModeChecked(prev => ({...prev, email: event.target.checked}))
                                setValues(prev => {
                                    if (modeChecked.email){
                                        return [...prev, "phone"]
                                    }else if (!modeChecked.email && prev.indexOf("phone") !== -1){
                                        return prev.splice(prev.indexOf("phone"), 1)
                                    }
                                })
                            }} 
                            name="modeOfContact" 
                            value="email"/>
                            }
                            label="Phone"
                        />
                    </FormGroup>
                    <FormHelperText>{values.modeOfContact.length < 1 && "Please pick at least one"}</FormHelperText>
                </FormControl>
                <Button type="submit" onSubmit={handleSubmit}>Submit</Button>
            </Box>
            <h1 class={successful ? "show" : "hide"}>Thank you for submitting your {values.kindOfRequest}! 
                We will get back to you via {values.modeOfContact.join(" and ")} in the next 2-3 business days.
                We hope you have a good rest of your day and enjoy our website!</h1>
        </div>
  )
}