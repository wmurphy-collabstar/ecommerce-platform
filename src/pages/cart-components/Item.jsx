import React from "react"
import QuantityChange from "./QuantityChange"
import Price from "./Price"

//Formatting for each item in cart, including their quantity and overall price
export default function Item(props){
    const {prod, addToCart} = props
    const [currQuant, setCurrQuant] = React.useState(prod.quantity)
    const [currStock, setCurrStock] = React.useState(prod.inStock)

    return (
        <div class="main">
            <img src={prod.image} alt={prod.category}/>
            <div>
                <h2>{prod.title}</h2>
                <h2>{prod.description}</h2>
            </div>
            <QuantityChange 
                quantityState={[currQuant, setCurrQuant]} 
                stockState = {[currStock, setCurrStock]}
                addToCart = {addToCart}
                product={prod}/>
            <Price price={prod.price} multiplier={currQuant}/>
        </div>
    )
}