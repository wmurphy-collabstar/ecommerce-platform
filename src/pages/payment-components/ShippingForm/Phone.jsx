import React from "react"
import {PhoneInput, isValidPhoneNumber} from 'react-phone-number-input'


export default function Phone(props){
    const {readOnly, step, formCompletion, setShippingAdd} = props
    const [addedInfo, setAddedInfo] = React.useState(false)

    if (step !== 10 || formCompletion.shippingFilled){
        return null
    }

    function handleChange(event){
        if(isValidPhoneNumber(event.target.value)){
            setShippingAdd(prev => ({...prev, phone: event.target.value}))
            setAddedInfo(true)
        }
    }

    return (
        <div>
            <PhoneInput
                id="phone"
                label="Phone"
                required
                readOnly={readOnly}
                error={!addedInfo}
                helperText={!addedInfo? "Need to add your phone number" : ""}
                onChange={handleChange}
                placeholder="1234567890"
            />
        </div>
    )
}