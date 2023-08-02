import React from "react"

// Displayed price of each item in cart for custom quantity
export default function Price(props){
    const {price, mulitiplier} = props

    return(
        <div>
            <p>$ {price*mulitiplier}</p>
        </div>
    )
}