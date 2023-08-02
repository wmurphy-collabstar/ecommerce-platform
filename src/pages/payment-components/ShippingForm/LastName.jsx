import React from "react"
import TextField from '@mui/material/TextField';


export default function LastName(props){
    const {readOnly, step, formCompletion, setShippingAdd, validState} = props
    const [addedInfo, setAddedInfo] = React.useState(false)

    if (step !== 2 || formCompletion.shippingFilled){
        return null
    }

    function handleChange(event){
        if(validState(event.target.value)){
            setShippingAdd(prev => ({...prev, lastName: event.target.value}))
            setAddedInfo(true)
        }
    }

    return (
        <div>
            <TextField
                id="lastName"
                label="Last Name"
                max="50"
                required
                readOnly={readOnly}
                error={!addedInfo}
                helperText={!addedInfo? "Need to add your last name with no spaces" : ""}
                onChange={handleChange}
                placeholder="Doe"
            />
        </div>
    )
}