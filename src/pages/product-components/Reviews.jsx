import React from "react"
import LeftSide from "./LeftSide"
import RightSide from "./RightSide"

/*Reviews for each product, separated into written customer reviews with 
sorting functionality (LeftSide) as well as filter option via number of stars in
rating (RightSide)
*/
export default function Reviews(props){
    const {product} = props
    const [totalToView, setTotalToView] = React.useState(0)
    const [clicked, setClicked] = React.useState({"five": false,
                                                    "four": false,
                                                    "three": false,
                                                    "two": false,
                                                    "one": false})
    
    return (
        <div class="reviews">
            <LeftSide 
                rating={product.meanRating} 
                reviews={product.reviews}
                total = {totalToView}
                clicked = {clicked}
                className="left-side"
            />
            <RightSide 
                ratings={product.ratings} 
                functions={[setTotalToView, setClicked]}
                clicked={clicked}
                className="right-side"
            />
        </div>
    )
}