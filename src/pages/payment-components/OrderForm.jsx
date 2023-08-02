import React from "react"
import {Link} from "react-router-dom"
import Button from "@mui/material/Button"

export default function OrderForm(props){
    const {state, formState, order, totalPrice} = props
    const [currentForm, _] = state
    const [formCompletion, setFormCompletion] = formState

    if (currentForm!== "order" || formCompletion.orderFilled){
        return null
    }

    function handleClick(){
        setFormCompletion((prev) => {return {...prev, orderFilled: true}})
    }


    const orderList = order.map((product) => {
        return <li>{product.title}({product.quantity}): ${product.price*product.quantity}</li>
    })
    return (
        <div class="main">
            <h1>Confirmation</h1>
            <h2>
                Here is a preview of your current order:
            </h2>
            <ul>
                {orderList}
            </ul>
            <h2>Total Price: ${totalPrice}</h2>
            <h2>Are you ready to checkout?</h2>
            <div>
                <Link to="/cart">I'm still thinking...</Link>
                <Button onClick={handleClick}>Yes, I'm ready!</Button>
            </div>
        </div>
    )
}