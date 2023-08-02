import React from "react"
import UserReview from "./UserReview"
import Button from '@mui/material/Button'

//List of reviews on a product from past customers sortable by date
export default function LeftSide(props){
    const {rating, reviews, total, clicked} = props
    const [reviewsVisible, setReviewsVisible] = React.useState([])

    function getAllReviews(){
        for (let rating in clicked){
            if (clicked[rating]){
                setReviewsVisible((prev) => [...prev, ...reviews[rating].reviewList.map(
                    (reviewObj => {
                        switch (rating){
                            case "five":
                                return {...reviewObj, rating: 5}
                            case "four":
                                return {...reviewObj, rating: 4}
                            case "three": 
                                return {...reviewObj, rating: 3}
                            case "two":
                                return {...reviewObj, rating: 2}
                            case "one":
                                return {...reviewObj, rating: 1}
                        }
                    }))
                ])
            }
        }
    }

    getAllReviews()

    const userReviews = reviewsVisible.map((review) => {
        return <UserReview review={review}/>
    })

    function handleOldest(){
        setReviewsVisible((prev) => {
            prev.sort((reviewA, reviewB) => {
                Date(reviewA.date) - Date(reviewB.date)
            })
        })
    }

    function handleNewest(){
        setReviewsVisible((prev) => {
            prev.sort((reviewA, reviewB) => {
                Date(reviewB.date) - Date(reviewA.date)
            })
        })
    }

    return (
        <>
            <h1>Reviews</h1>
            <p>Overall Rating: {rating}</p>
            <p>Review count: {total}</p>
            <Button onClick = {handleOldest} variant="contained">Oldest</Button>
            <Button onClick={handleNewest} variant="contained">Newest</Button>
            <div>
                {userReviews}
            </div>
        </>
    )
}