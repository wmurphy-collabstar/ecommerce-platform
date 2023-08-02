import React from "react"
import Searchbar from "./listings-components/Searchbar"
import Products from "./listings-components/Products"
import Filter from "./listings-components/Filter"
import Sort from "./listings-components/Sort"
import useSWR from "swr"

//Page that lists all available products
export default function Listings(props){

    //Product data
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error, isLoading } = useSWR('/api/staticdata', fetcher)

    //Typed input in Search bar
    const [searchInput, setSearchInput] = React.useState("")

    //Picked option for Sort
    const [sortingOption, setSortingOption] = React.useState("")

    //Selected options for Filter
    const [selected, setSelected] = React.useState(
        {
            categories: [],
            prices: [],
            inStock: []
        }
    )
    //List of kind of product for Filter
    const categoryList = [...new Set(data.map((obj) => obj.category))]
    const priceConversion = {
        "under $30": {
            min: 0,
            max: 30

        },
        "$30 - $50": {
            min: 30,
            max: 50
        },
        "$50 - $100": {
            min: 50,
            max: 100
        },
        "over $100": {
            min: 100,
            max: null
        }
    }

    if (error){
        return (
            <div class="main">
                <h1 class="error-message">Failed to load products.</h1>
            </div>
        )
    }
    else if (isLoading){
        return (
            <div class="main">
                <h1 class="error-message">Loading...</h1>
            </div>
        )
    }else {

        const myProducts = JSON.parse(data)
        let myProductList = []
        for (let key in myProducts){
            myProductList.push(myProducts[key])
        }
        return (
            <>
                <Searchbar setSearchInput={setSearchInput}/>
                <Filter 
                    catList={categoryList} 
                    setSelected={setSelected}
                    priceList = {Object.keys(priceConversion)}/>
                <Sort setSortingOption={setSortingOption}/>
                <Products 
                filters={[searchInput, sortingOption, selected]}
                data = {myProductList}
                priceConversion={priceConversion}/>
            </>
        )
    }
}