import React from "react"
import {Link} from "react-router-dom"
import Highlighter from "react-highlight-words"

export default function Products(){
    const {filters, data, priceConversion} = props
    const [searchInput, sortingOption, selected] = filters

    const dataWithSearchInput = data.filter((obj) => {
        return obj.title.includes(searchInput) || obj.description.includes(searchInput)
    })

    const dataWithFilters = dataWithSearchInput.filter((obj) => {
        const {categories, prices, inStock} = selected
        const inStockOptionsSelected = selected.inStock.length === 0 ? [0] : 
            selected.inStock.map((amount) => {
                if (amount==="50+"){
                    return Math.POSITIVE_INFINITY
                }else{
                    return parseInt(amount)
                }
            })
        const maxInStock = Math.max(...inStockOptionsSelected)
        const convertedPriceOptions = prices.map((option) => {
            return [priceConversion[option].min, priceConversion[option].max]
        })
        const [MinPrice, MaxPrice] = [
            Math.min(...convertedPriceOptions.map(([min,_]) => min)),
            Math.max(...convertedPriceOptions.map(([_, max]) => max))
        ]
        return (categories.length === prices.length === inStock.length === 0) ||
                (categories.includes(obj.category) && 
                 MinPrice <= obj.price <= MaxPrice && 
                 obj.inStock <= maxInStock
                 )

    })

    const finalData = dataWithFilters.
        sort((productA, productB) => {
            switch (sortingOption){
                case "Highest To Lowest":
                    return productB.price - productA.price
                case "Lowest To Highest":
                    return productA.price - productB.price
                case "Oldest to Newest":
                    return Date(productA.dateAdded) - Date(productB.dateAdded)
                case "Newest to Oldest":
                    return Date(productB.dateAdded) - Date(productA.dateAdded)
                case "Least to Most":
                    return productA.inStock - productB.inStock
                case "Most to Least":
                    return productB.inStock - productA.inStock
                case "Best Rated to Worst Rated":
                    return productA.meanRating - productB.meanRating
                case "Worst Rated to Best Rated":
                    return productB.meanRating - productA.meanRating
                default:
                    return productA
            }
        })
    
    const prodList = data.length === 0 ? <h1 class="error-message">No products here...</h1> : 
        finalData.map((product) => {
            <Link 
                to={`product/${product.id}`} 
                state={{
                    prodData: product, 
                }}
            >
                <div class="main">
                    <img src={product.image} alt={product.category}/>
                    <Highlighter 
                        className="title"
                        highlightClassName="searchedKeyWords"
                        searchWords={[searchInput]}
                        autoEscape={true}
                        textToHighlight={product.title}/>
                    <Highlighter 
                        className="description"
                        highlightClassName="searchedKeyWords"
                        searchWords={[searchInput]}
                        autoEscape={true}
                        textToHighlight={product.description.split(".")[0]+"..."}/>
                    <h2>${product.price}</h2>
                </div>
            </Link>
        })
    return (
        {prodList}
    )
}