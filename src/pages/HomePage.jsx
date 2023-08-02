import React from "react"
import FeaturedCarousel from "./home-components/FeaturedCarousel"
import useSWR from "swr"

//Homepage displaying featured products
export default function HomePage(){

    //Product data
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error, isLoading } = useSWR('/api/staticdata', fetcher)

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
    }
    else {
        const myData = JSON.parse(data)
        let myDataList = []
        for (let key in myData){
            myDataList.push(myData[key])
        }
        const highestRated = myData.sort((a, b) => a.meanRating - b.meanRating).slice(0,5)
        const featuredFive = highestRated.sort((a, b) => Date(a.dateAdded)-Date(b.dateAdded))

        return (
            <div class="main">
                <FeaturedCarousel featuredFive={featuredFive}/>
            </div>
            
        )
    }
}