import React from "react"
import {useNavigate} from "react-router-dom"
import FirstName from "./BillingForm/FirstName"
import LastName from "./BillingForm/LastName"
import StreetAdd from "./BillingForm/StreetAdd"
import City from "./BillingForm/City"
import InUS from "./BillingForm/InUS"
import State from "./BillingForm/State"
import Country from "./BillingForm/Country"
import ZipCode from "./BillingForm/ZipCode"
import Email from "./BillingForm/Email"
import Phone from "./BillingForm/Phone"
import IsShippingAdd from "./BillingForm/IsShippingAdd"
import IsShippingEmail from "./BillingForm/IsShippingEmail"
import IsShippingPhone from "./BillingForm/IsShippingPhone"
import Box from '@mui/material/Box';

export default function BillingForm(props){
    const {state, formState, billingState} = props
    const [step, setStep] = React.useState(1)

    if (state.currentForm!== "billing" && formState.formCompletion.billingFilled){
        return null
    }

    function handleChange(event) {
        const {name, value} = event.target
        billingState.setBillingAdd((prev) => {
            prev[name] = value
        }) 
      }
    
      // Trigger an alert on form submission
    function handleSubmit(event){
        event.preventDefault()
        state.setFormCompletion((prev) => {return {...prev, billingFilled: true}})

        const nav = useNavigate()
        nav("/checkout")
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
            <IsShippingAdd 
                readOnly={false}
                stepState={[step, setStep]}
                handleChange={handleChange}/>
            <FirstName 
                readOnly={false}
                stepState={[step, setStep]}
                handleChange={handleChange}/>
            <LastName 
                readOnly={false}
                stepState={[step, setStep]}
                handleChange={handleChange}/>
            <StreetAdd 
                readOnly={false}
                stepState={[step, setStep]}
                handleChange={handleChange}/>
            <City 
                readOnly={false}
                stepState={[step, setStep]}
                handleChange={handleChange}/>
            <InUS
                readOnly={false}
                stepState={[step, setStep]}
                handleChange={handleChange}/>
            <State
                readOnly={false}
                stepState={[step, setStep]}
                handleChange={handleChange}/>
            <Country
                readOnly={false}
                stepState={[step, setStep]}
                handleChange={handleChange}/>
            <ZipCode 
                readOnly={false}
                stepState={[step, setStep]}
                handleChange={handleChange}/>
            <IsShippingEmail 
                readOnly={false}
                stepState={[step, setStep]}
                handleChange={handleChange}/>
            <Email
                readOnly={false}
                stepState={[step, setStep]}
                handleChange={handleChange}/>
            <IsShippingPhone 
                readOnly={false}
                stepState={[step, setStep]}
                handleChange={handleChange}/>
            <Phone
                readOnly={false}
                stepState={[step, setStep]}
                handleChange={handleChange}/>
        </Box>
    )
}