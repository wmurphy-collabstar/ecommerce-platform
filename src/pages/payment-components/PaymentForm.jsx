import React from "react"
import {Link, useNavigate} from "react-router-dom"
import NameOnCard from "./PaymentForm/NameOnCard"
import CardNumber from "./PaymentForm/CardNumber"
import DateOfExpiration from "./PaymentForm/DateOfExpiration"
import CVV from "./PaymentForm/CVV"
import ZipCode from "./PaymentForm/ZipCode"
import Box from '@mui/material/Box';

export default function PaymentForm(props){
    const {state, formState, paymentState} = props
    const [step, setStep] = React.useState(1)

    if (state.currentForm!== "payment" && formState.formCompletion.paymentFilled){
        return null
    }

    function handleChange(event) {
        const {name, value} = event.target
        paymentState.setPayment((prev) => {
            prev[name] = value
        }) 
      }
    
      // Trigger an alert on form submission
    function handleSubmit(event){
        event.preventDefault()
        state.setFormCompletion((prev) => {return {...prev, deliveryFilled: true}})

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
            <NameOnCard 
                readOnly={false}
                stepState={[step, setStep]}
                handleChange={handleChange}/>
            <CardNumber 
                readOnly={false}
                stepState={[step, setStep]}
                handleChange={handleChange}/>
            <DateOfExpiration 
                readOnly={false}
                stepState={[step, setStep]}
                handleChange={handleChange}/>
            <CVV 
                readOnly={false}
                stepState={[step, setStep]}
                handleChange={handleChange}/>
            <ZipCode 
                readOnly={false}
                stepState={[step, setStep]}
                handleChange={handleChange}/>
        </Box>
    )
}