import React from "react"
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'


export default function Country(props){
    const {readOnly, step, formCompletion, setShippingAdd, list} = props
    const [chosen, setChosen] = React.useState(false)

    if (step !== 7 || formCompletion.shippingFilled){
        return null
    }

    function handleChange(event){
        if (event.target.value !== ""){
            setShippingAdd(prev => ({...prev, state: event.target.value}))
            setChosen(true)
        }
    }

    const selectItems = list.map((country) => {
        return <MenuItem value={country}>{country}</MenuItem>
    })

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel htmlFor="countries">Country</InputLabel>
                <Select 
                defaultValue=""
                readOnly={readOnly}
                error={!chosen}
                helperText={!chosen ? "Need to choose a country" : ""}
                id="country" 
                label="Country"
                onChange={handleChange}>
                    {selectItems}
                </Select>
            </FormControl>
        </div>
    )
}