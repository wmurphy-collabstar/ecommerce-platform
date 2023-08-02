import React from "react"
import { Link } from "react-router-dom"

//The place to navigate between Home, Listings, Cart and Contact pages 
export default function Nav(props) {   
    const {order} = props
    return (     
        <nav>       
            <ul>         
                <li>           
                    <Link to="/">Home</Link>         
                </li> 
                <li>
                    <Link to="/listings">Listings</Link>
                </li>        
                <li>           
                    <Link to="/cart" state={{order: order}}>My Cart</Link>         
                </li>         
                <li>           
                    <Link to="/contact">Contact</Link>         
                </li>       
            </ul>     
        </nav>   
    ) 
}