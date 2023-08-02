import React from "react"
import TextField from '@mui/material/TextField';


export default function City(props){
    const {readOnly, step, formCompletion, setShippingAdd, validState} = props
    const [addedInfo, setAddedInfo] = React.useState(false)

    if (step !== 4 || formCompletion.shippingFilled){
        return null
    }

    function handleChange(event){
        if(validState(event.target.value)){
            setShippingAdd(prev => ({...prev, city: event.target.value}))
            setAddedInfo(true)
        }
    }

    return (
        <div>
            <TextField
                id="city"
                label="City"
                max="100"
                required
                readOnly={readOnly}
                error={!addedInfo}
                helperText={!addedInfo? "Need to type out your city" : ""}
                onChange={handleChange}
                placeholder="Nowhere city"
            />
        </div>
    )
}