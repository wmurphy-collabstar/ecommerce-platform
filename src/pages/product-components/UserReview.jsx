import React from "react"
import Rating from '@mui/material/Rating'

export default function UserReview(props){
    const {review} = props

    return (
        <div class = "user-review">
            <Rating name="userRating" value={review.rating} readOnly />
            <p>{review.words}</p>
            <h4>{review.published}</h4>
        </div>
    )
}