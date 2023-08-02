import React from "react"
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import {Link} from "react-router-dom"

export default function OrderSummary(props){
    const {state, formState, order, totalPrice, complete} = props
    const [currentForm, setCurrentForm] = state
    const [formCompletion, _] = formState

    if ((currentForm!== "order" && !formCompletion.orderFilled)
        || !complete){
        return null
    }

    const [open, setOpen] = React.useState(true)

    function handleClick(){
        setOpen(!open)
        if (open && !complete){
            setCurrentForm("delivery")
        }
    }

    const orderList = order.map(({title, quantity, price}) => {
        return <li>{title}({quantity}): ${price*quantity}</li>
    })

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
                <div>
                    <ul>
                        {orderList}
                    </ul>
                    <h2>Total Price: ${totalPrice}</h2>
                    <Link to="/cart">Oh shoot! I change my mind.</Link>
                </div>
            </Collapse>
        </List>
    )
}