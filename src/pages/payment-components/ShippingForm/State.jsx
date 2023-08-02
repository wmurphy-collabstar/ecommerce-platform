import React from "react"
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'


export default function State(props){
    const {readOnly, step, formCompletion, setShippingAdd, list} = props
    const [chosen, setChosen] = React.useState(false)

    if (step !== 6 || formCompletion.shippingFilled){
        return null
    }

    function handleChange(event){
        if (event.target.value !== ""){
            setShippingAdd(prev => ({...prev, state: event.target.value}))
            setChosen(true)
        }
    }

    const selectItems = list.map((state) => {
        return <MenuItem value={state}>{state}</MenuItem>
    })

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel htmlFor="states">State</InputLabel>
                <Select 
                defaultValue=""
                readOnly={readOnly}
                error={!chosen}
                helperText={!chosen ? "Need to choose a state" : ""}
                id="state" 
                label="State"
                onChange={handleChange}>
                    {selectItems}
                </Select>
            </FormControl>
        </div>
    )
}