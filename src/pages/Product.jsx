import React from "react"
import {useLocation, Link, useOutletContext} from "react-router-dom"
import Button from '@mui/material/Button'
import Reviews from "./product-components/Reviews"

// Page for each product
export default function Product(props){
    const {context} = props
    const [quantity, setQuantity] = React.useState(0)
    const location = useLocation()
    const prodData = location.state.prodData
    const [updatedStock, setUpdatedStock] = React.useState(prodData.inStock)
    // const {addToCart, _} = useOutletContext()


    //Handling controls for increasing and decreasing quantity
    function handleDecrement(){
        setQuantity((prev) => prev-1)
        setUpdatedStock(prev => prev+1)
    }

    function handleIncrement(){
        setQuantity((prev) => prev+1)
        setUpdatedStock(prev => prev-1)
    }

    function handleAddToCart(){
        if (quantity > 0){
            context.addToCart({...prodData, quantity: quantity, inStock: updatedStock})
        }
    }

    return (
        <>
            <Link to="/listings">Go Back</Link>
            <img src={prodData.image} alt={prodData.category}/>
            <h1>{prodData.title}</h1>
            <p>{prodData.description}</p>
            <h1>Category: {prodData.category} Number in Stock: {updatedStock}</h1>
            <div>
                <Button 
                    onClick={handleDecrement}
                    disabled={quantity < 0}
                > - 
                </Button>
                <p>{quantity}</p>
                <Button 
                    onClick={handleIncrement}
                    disabled={updatedStock === 0}> + </Button>
            </div>
            <Button  onClick={handleAddToCart}>Add to Cart</Button>
            <Reviews product={prodData}/>
        </>
    )
}