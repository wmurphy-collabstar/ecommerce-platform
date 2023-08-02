import React from "react"
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import FirstName from "./ShippingForm/FirstName"
import LastName from "./ShippingForm/LastName"
import StreetAdd from "./ShippingForm/StreetAdd"
import City from "./ShippingForm/City"
import InUS from "./ShippingForm/InUS"
import State from "./ShippingForm/State"
import Country from "./ShippingForm/Country"
import ZipCode from "./ShippingForm/ZipCode"
import Email from "./ShippingForm/Email"
import Phone from "./ShippingForm/Phone"
import Button from '@mui/material/Button'

export default function OrderSummary(props){
    const {state, formState, shippingState, complete, validFunctions, lists} = props
    const [currentForm, setCurrentForm] = state
    const [formCompletion, _] = formState
    const [shippingAdd, setShippingAdd] = shippingState
    const [validName, validStreetAdd, validCity,
        validZipCode] = validFunctions
    const [listOfCountries, listOfStates] = lists
    const [open, setOpen] = React.useState(true)
    const [editForm, setEditForm] = React.useState(false)

    if ((currentForm!== "shipping" && !formCompletion.shippingFilled) ||
        !complete){
        return null
    }

    const handleClick = () => {
        setOpen(!open)
        if (!open && !complete && !editForm){
            setCurrentForm("shipping")
        }
    }

    function handleSubmit(event){
        event.preventDefault()
        setEditForm(false)
    }

    return (
        <List>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <ShoppingBasketRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Order Details" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    handleSubmit={handleSubmit}
                    >
                    <Options 
                        readOnly={!editForm}
                        step={step}
                        formCompletion={formCompletion}
                        deliveryState={deliveryState}
                        />
                    <MoreInfo 
                        readOnly={!editForm}
                        step={step}
                        formCompletion={formCompletion}
                        deliveryState={deliveryState}/>
                    <Button 
                        id="edit" 
                        variant="text"
                        onClick={() => setEditForm(prev => !prev)}
                        disabled={!editForm}>Edit</Button>
                    <Button 
                        id="submit" 
                        type="submit" 
                        variant="contained"
                        disabled={editForm}>Submit</Button>
                </Box>
            </Collapse>
        </List>
    )
}