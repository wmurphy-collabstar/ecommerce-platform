import React from "react"
import {useOutletContext, Link} from "react-router-dom"
import Item from "./cart-components/Item"
import Price from "./cart-components/Price"

// Page showing the current cart, where one can also adjust quantities
export default function Cart(props){
    const {context} = props
    // const {addToCart, cart} = useOutletContext()

    const listOfItems = context.cart.map((prod) => {
        <Item prod={prod} addToCart={context.addToCart}/>
    })

    const totalItems = context.cart.reduce((a, b) => {
        return a.quantity + b.quantity
    }, 0)

    const totalPrice = context.cart.reduce((a, b) => {
        return (a.price*a.quantity) + (b.price*b.quantity)
    }, 0)

    return (
        <>
            <h1>Cart</h1>
            <Link 
                state={{order: currentOrder}} 
                to="/"
            >
                Continue Shopping
            </Link>
            {listOfItems}
            <div>
                <p>{totalItems}</p>
                <Price value={totalPrice} multiplier={1}/>
            </div>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact</Link>
            <Link 
                state={{order: currentOrder,
                        totalPrice: totalPrice
                }} 
                to="/checkout"
            >
                Checkout
            </Link>

        </>
    )
}