import React from "react"
import TextField from '@mui/material/TextField'


export default function MoreInfo(props){
    const {readOnly, step, formCompletion, deliveryState} = props
    const [deliveryFee, setDeliveryFee] = deliveryState
    const [addedInfo, setAddedInfo] = React.useState(false)

    if (step !== 2 || formCompletion.deliveryFilled){
        return null
    }

    function validMoreInfo(value){
        return /^[A-Za-z ,.;:()]+$/.test(value)
    }

    function handleChange(event){
        if(validMoreInfo(event.target.value)){
            for (let option in deliveryFee){
                if (deliveryFee[option].chosen){
                    setDeliveryFee(prev => { prev[option].moreInfo = event.target.value})
                    setAddedInfo(true)
                }
            }
        }
    }

    return (
        <div>
            <TextField
                id="moreInfo"
                label="More Info"
                max="50"
                required
                readOnly={readOnly}
                error={!addedInfo}
                helperText={!addedInfo? "Need to fill out correctly with only these symbols ,.;:()" : ""}
                onChange={handleChange}
                placeholder="Place at my door"
            />
        </div>
    )
}