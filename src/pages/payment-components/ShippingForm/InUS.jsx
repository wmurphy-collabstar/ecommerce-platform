import React from "react"
import TextField from '@mui/material/TextField';


export default function InUS(props){
    const {readOnly, step, formCompletion, setShippingAdd} = props

    if (step !== 5 || formCompletion.shippingFilled){
        return null
    }

    function handleChange(event){
        setShippingAdd(prev => ({...prev, inUS: event.target.checked}))
    }

    return (
        <div>
            <FormControlLabel
                control={
                <Checkbox 
                    readOnly={readOnly}
                    checked={false} 
                    onChange={handleChange}
                    value="inUS"/>
                }
                label="In the US?"
            />
        </div>
    )
}