import '@/styles/globals.css'
import React from "react"
import Layout from "./Layout"

// Needed configuration to use BrowserRoutes as well as avoid hydration warnings
export default function App({ Component, pageProps }) {
  const [render, setRender] = React.useState(false)
 
  React.useEffect(() => {
    setRender(true)
  }, [])

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
    !render ? null : 
      <Layout>
        <Component {...pageProps} context={{addToCart: addToCart, cart: cart}}/>
      </Layout> 
  )
}
