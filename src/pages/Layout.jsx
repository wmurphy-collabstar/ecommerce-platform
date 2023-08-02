import React from "react"
import {Outlet} from "react-router-dom"
import Nav from "./Nav"
import Footer from "./Footer"

//Main layout for the website

export default function Layout({children}) {   
    //State for the shopping cart
    const [cart, setCart] = React.useState([])
    function addToCart(item){
        setCart((prev) => {
            for (let prod of prev){
                if (prod.id === item.id){
                    prod = {...prod, quantity: item.quantity, inStock: item.inStock}
                    if (item.quantity === 0){
                        prev.splice(prev.indexOf(prod), 1)
                    }
                    return prev
                }
            }
            return [...prev, item]
        })
    }

    return (     
        <>       
            <Nav order={cart}/>  
            <main>{children}</main>     
            <Outlet context={{addToCart: addToCart,
                             cart: cart}}/>
            <Footer />    
        </>   
    ) 
}


