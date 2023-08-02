import React from "react"
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'




export default function Options(props){
    const {readOnly, step, formCompletion, deliveryState} = props
    const {deliveryFee, setDeliveryFee} = deliveryState

    if (step !== 1 || formCompletion.deliveryFilled){
        return null
    }

    return (
        <div>
            <FormControl>
                <FormLabel id="deliveryOptions">Delivery Options</FormLabel>
                <RadioGroup
                    row
                    defaultValue = "Standard"
                    required
                    aria-labelledby="deliveryOptions"
                    name="deliveryOptions"
                    readOnly={readOnly}
                    onChange={(event) => {
                        setDeliveryFee(prev => { 
                            prev[event.target.value].chosen = true
                        })
                    }}
                >
                    <FormControlLabel 
                        value="Standard" 
                        control={<Radio />} 
                        label={`Standard (${deliveryFee["Standard"].time}): 
                                $${deliveryFee["Standard"].price}`} />
                    <FormControlLabel 
                        value="Expedited" 
                        control={<Radio />} 
                        label={`Expedited (${deliveryFee["Expedited"].time}): 
                                $${deliveryFee["Expedited"].price}`} />
                    <FormControlLabel 
                        value="Relaxed" 
                        control={<Radio />} 
                        label={`Relaxed (${deliveryFee["Relaxed"].time}): 
                                $${deliveryFee["Relaxed"].price}`} />
                </RadioGroup>
            </FormControl>
        </div>
    )
}