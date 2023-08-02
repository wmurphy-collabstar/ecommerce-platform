import React from "react"
import TextField from '@mui/material/TextField'


export default function Email(props){
    const {readOnly, step, formCompletion, setShippingAdd} = props
    const [addedInfo, setAddedInfo] = React.useState(false)

    if (step !== 9 || formCompletion.shippingFilled){
        return null
    }

    function handleChange(event){
        if(event.target.validity.valid){
            setShippingAdd(prev => ({...prev, email: event.target.value}))
            setAddedInfo(true)
        }
    }

    return (
        <div>
            <TextField
                id="email"
                label="Email"
                type="email"
                required
                readOnly={readOnly}
                error={!addedInfo}
                helperText={!addedInfo? "Need to add your email" : ""}
                onChange={handleChange}
                placeholder="hello@example.com"
            />
        </div>
    )
}