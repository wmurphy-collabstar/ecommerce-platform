import React from "react"
import TextField from '@mui/material/TextField';


export default function StreetAdd(props){
    const {readOnly, step, formCompletion, setShippingAdd, validState} = props
    const [addedInfo, setAddedInfo] = React.useState(false)

    if (step !== 3 || formCompletion.shippingFilled){
        return null
    }

    function handleChange(event){
        if(validState(event.target.value)){
            setShippingAdd(prev => ({...prev, streetAddress: event.target.value}))
            setAddedInfo(true)
        }
    }

    return (
        <div>
            <TextField
                id="streetAddress"
                label="Street Address"
                max="100"
                required
                readOnly={readOnly}
                error={!addedInfo}
                helperText={!addedInfo? "Add your street address including unit, apt, etc." : ""}
                onChange={handleChange}
                placeholder="123 Nowhere Avenue"
            />
        </div>
    )
}