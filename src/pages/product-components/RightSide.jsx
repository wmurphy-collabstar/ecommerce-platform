import React from "react"
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Filters based on number of stars in rating
export default function RightSide(props){
    const {ratings, functions, clicked} = props
    const [setTotalToView, setClicked] = functions

    // handle clicking on rating buttons
    function handleClick(event){
        const id = event.target.id
        setClicked((prev) => { 
            switch (id){
                case "one":
                    return {...prev, one: !prev["one"]}
                case "two":
                    return {...prev, two: !prev["two"]}
                case "three":
                    return {...prev, three: !prev["three"]}
                case "four":
                    return {...prev, four: !prev["four"]}
                case "five":
                    return {...prev, five: !prev["five"]}
            }
        })
        if (clicked[id]){
            setTotalToView((prev) => prev+ratings[id])
        }else{
            setTotalToView((prev) => prev-ratings[id])
        }
    }

    return (
        <div>
            {/* A button for each kind of rating, from 1 to 5 starts */}
            <Button className="ratingBtn" onClick={handleClick} id="five">
                <Typography component="legend">{ratings.five}</Typography>
                <Rating name="ratingBtn" value="5" readOnly />
            </Button>
            <Button className="ratingBtn" onClick={handleClick} id="four">
                <Typography component="legend">{ratings.four}</Typography>
                <Rating name="ratingBtn" value="4" readOnly />
            </Button>
            <Button className="ratingBtn" onClick={handleClick} id="three">
                <Typography component="legend">{ratings.three}</Typography>
                <Rating name="ratingBtn" value="3" readOnly />
            </Button>
            <Button className="ratingBtn" onClick={handleClick} id="two">
                <Typography component="legend">{ratings.two}</Typography>
                <Rating name="ratingBtn" value="2" readOnly />
            </Button>
            <Button className="ratingBtn" onClick={handleClick} id="one">
                <Typography component="legend">{ratings.one}</Typography>
                <Rating name="ratingBtn" value="1" readOnly />
            </Button>
        </div>
        
    )

}