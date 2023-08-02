import React from "react"
import Button from '@mui/material/Button'

//Functionality on Cart page to increase/decrease quantity of item in cart
export default function QuantityChange(props){
    const {quantityState, stockState, addToCart, product} = props
    const [currQuant, setCurrQuant] = quantityState
    const [currStock, setCurrStock] = stockState

    function handleIncrement(){
        setCurrQuant(prev => prev + 1)
        setCurrStock(prev => prev - 1)
        addToCart({...product, quantity: currQuant, inStock: currStock})
    }

    function handleDecrement(){
        setCurrQuant(prev => prev - 1)
        setCurrStock(prev => prev + 1)
        addToCart({...product, quantity: currQuant, inStock: currStock})
    }

    return (
        <>
            <Button 
                onClick={handleDecrement}
                disabled={currQuant === 0}
            > - 
            </Button>
            <p>{amount}</p>
            <Button 
                onClick={handleIncrement}
                disabled={currStock === 0}
            > + 
            </Button>
        </>
    )
}