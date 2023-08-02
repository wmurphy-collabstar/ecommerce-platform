import React from "react"
import TextField from '@mui/material/TextField';


export default function MoreInfo(props){
    const {readOnly, stepState, formState} = props

    if (stepState.step !== 1 && formState.formCompletion.deliveryFilled && readOnly){
        return null
    }

    return (
        <>
            <div>
            <TextField
                id="standard-helperText"
                label="More Info"
                required
                error={isUrlValid(validateUrl.url)}
                helperText={isUrlValid(validateUrl.url) ? "URL is not correct" : ""}
                onChange={event => setValid({ url: 'https://url.com', tempUrl: event.target.value })}
            />
            </div>
        </>
    )
}