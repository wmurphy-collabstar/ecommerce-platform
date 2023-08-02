import React from "react"
import FirstName from "./ShippingForm/FirstName"
import LastName from "./ShippingForm/LastName"
import StreetAdd from "./ShippingForm/StreetAdd"
import City from "./ShippingForm/City"
import InUS from "./ShippingForm/InUS"
import State from "./ShippingForm/State"
import Country from "./ShippingForm/Country"
import ZipCode from "./ShippingForm/ZipCode"
import Email from "./ShippingForm/Email"
import Phone from "./ShippingForm/Phone"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export default function ShippingForm(props){
    const {state, formState, shippingState, validFunctions, lists} = props
    const {currentForm, _} = state
    const {formCompletion, setFormCompletion} = formState
    const {shippingAdd, setShippingAdd} = shippingState
    const [validName, validStreetAdd, validCity,
        validZipCode] = validFunctions
    const [listOfCountries, listOfStates] = lists
    const [step, setStep] = React.useState(1)

    if (currentForm !== "shipping" || formCompletion.shippingFilled){
        return null
    }

    function handleNext(){
        setStep(prev => prev+1)
    }

    function handlePrev(){
        setStep(prev => prev-1)
    }

    
    
      // Trigger an alert on form submission
    function handleSubmit(event){
        event.preventDefault()
        setFormCompletion((prev) => {return {...prev, shippingFilled: true}})
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            autoComplete="off"
        >
            <FirstName 
                readOnly={false}
                step={step}
                formCompletion={formCompletion}
                setShippingAdd={setShippingAdd}
                validState={validName}/>
            <LastName 
                readOnly={false}
                step={step}
                formCompletion={formCompletion}
                setShippingAdd={setShippingAdd}
                validState={validName}/>
            <StreetAdd 
                readOnly={false}
                step={step}
                formCompletion={formCompletion}
                setShippingAdd={setShippingAdd}
                validState={validStreetAdd}/>
            <City 
                readOnly={false}
                step={step}
                formCompletion={formCompletion}
                setShippingAdd={setShippingAdd}
                validState={validCity}/>
            <InUS
                readOnly={false}
                step={step}
                formCompletion={formCompletion}
                setShippingAdd={setShippingAdd}/>
            <State
                readOnly={false}
                step={step}
                formCompletion={formCompletion}
                setShippingAdd={setShippingAdd}
                list={listOfStates}/>
            <Country
                readOnly={false}
                step={step}
                formCompletion={formCompletion}
                setShippingAdd={setShippingAdd}
                list={listOfCountries}/>
            <ZipCode 
                readOnly={false}
                step={step}
                formCompletion={formCompletion}
                setShippingAdd={setShippingAdd}
                validState={validZipCode}/>
            <Email 
                readOnly={false}
                step={step}
                formCompletion={formCompletion}
                setShippingAdd={setShippingAdd}/>
            <Phone
                readOnly={false}
                step={step}
                formCompletion={formCompletion}
                setShippingAdd={setShippingAdd}
                validState={isValidPhoneNumber}/>
            <Button class={step > 1 ? "show" : "hide"}id="prev" onClick={handlePrev}>Prev</Button>
            <Button class={step < 10 ? "show": "hide"}id="next" onClick={handleNext}>Next</Button>
            <Button class={step=== 10 ? "show" : "hide"}id="submit" type="submit">Submit</Button>
        </Box>
    )
}