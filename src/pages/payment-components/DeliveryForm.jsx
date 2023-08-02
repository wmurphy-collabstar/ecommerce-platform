import React from "react"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MoreInfo from "./DeliveryForm/MoreInfo"
import Options from "./DeliveryForm/Options"

export default function DeliveryForm(props){
    const {state, formState, deliveryState} = props
    const [currentForm, _] = state
    const [formCompletion, setFormCompletion] = formState
    const [step, setStep] = React.useState(1)

    if (currentForm!== "delivery" || formCompletion.deliveryFilled){
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
        setFormCompletion((prev) => {return {...prev, deliveryFilled: true}})
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
            <Options 
                readOnly={false}
                step={step}
                formCompletion={formCompletion}
                deliveryState={deliveryState}
                />
            <MoreInfo 
                readOnly={false}
                step={step}
                formCompletion={formCompletion}
                deliveryState={deliveryState}/>
            <Button class={step=== 2 ? "show" : "hide"}id="prev" onClick={handlePrev}>Prev</Button>
            <Button class={step===1 ? "show": "hide"}id="next" onClick={handleNext}>Next</Button>
            <Button class={step===2 ? "show" : "hide"}id="submit" type="submit">Submit</Button>
        </Box>
    )
}