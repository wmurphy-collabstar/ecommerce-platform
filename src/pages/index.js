import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Layout" 
import HomePage from "./HomePage"
import Product from "./Product" 
import Cart from "./Cart"
import Checkout from "./Checkout" 
import Contact from "./Contact"
import NoPage from "./NoPage"
import Listings from "./Listings"
import FAQ from "./FAQ"

// Routes to navigate for ecommerce website
export default function Home() {
  return (
    <BrowserRouter>       
      <Routes>         
        <Route path="/" element={<Layout />}/>           
        <Route index element={<HomePage />} />           
        <Route path="product/:productId" element={<Product />} />
        <Route path="listings" element={<Listings />}/>
        <Route path="cart" element={<Cart />}/>
        <Route path="checkout" element={<Checkout/>}/>        
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<FAQ />}/>         
        <Route path="*" element={<NoPage />} />         
      </Routes>     
    </BrowserRouter>
  )
}
