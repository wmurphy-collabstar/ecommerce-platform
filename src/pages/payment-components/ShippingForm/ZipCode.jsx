import React from "react"
import TextField from '@mui/material/TextField'


export default function ZipCode(props){
    const {readOnly, step, formCompletion, setShippingAdd, validState} = props
    const [addedInfo, setAddedInfo] = React.useState(false)

    if (step !== 8 || formCompletion.shippingFilled){
        return null
    }

    function handleChange(event){
        if(validState(event.target.value)){
            setShippingAdd(prev => ({...prev, zipCode: event.target.value}))
            setAddedInfo(true)
        }
    }

    return (
        <div>
            <TextField
                id="zipCode"
                label="zipCode"
                max="10"
                required
                readOnly={readOnly}
                error={!addedInfo}
                helperText={!addedInfo? "Need to add your zipcode" : ""}
                onChange={handleChange}
                placeholder="00000"
            />
        </div>
    )
}