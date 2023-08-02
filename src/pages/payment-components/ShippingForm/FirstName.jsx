import React from "react"
import TextField from '@mui/material/TextField'


export default function FirstName(props){
    const {readOnly, step, formCompletion, setShippingAdd, validState} = props
    const [addedInfo, setAddedInfo] = React.useState(false)

    if (step !== 1 || formCompletion.shippingFilled){
        return null
    }

    function handleChange(event){
        if(validState(event.target.value)){
            setShippingAdd(prev => ({...prev, firstName: event.target.value}))
            setAddedInfo(true)
        }
    }

    return (
        <div>
            <TextField
                id="firstName"
                label="First Name"
                max="50"
                required
                readOnly={readOnly}
                error={!addedInfo}
                helperText={!addedInfo? "Need to add your first name with no spaces" : ""}
                onChange={handleChange}
                placeholder="Jane/John"
            />
        </div>
    )
}