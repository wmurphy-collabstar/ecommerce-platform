import React from "react"
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Rating from '@mui/material/Rating'

// Formatting for each featured product highlighted on Homepage
export default function FeaturedProduct(props){
    const {featured} = props

    return (
        <div>
            <img 
                src={featured.image}
                alt={featured.category}/>
            <p className="legend">{featured.title}</p>
            <p className="legend">${featured.price}</p>
            <Rating name="read-only" value={featured.meanRating} readOnly />
        </div>
    )
}