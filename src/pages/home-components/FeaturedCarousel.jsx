import React from "react"
import FeaturedProduct from "./FeaturedProduct"
import { Carousel } from 'react-responsive-carousel'
import { Link } from "react-router-dom"
import 'react-responsive-carousel/lib/styles/carousel.min.css'

//Carousel of 5 featured products sorted by date added and visible on Homepage
export default function FeaturedCarousel(props){
    const {featuredFive} = props
    console.log(featuredFive)

    const [accessibleObj, setAccessibleObj]=React.useState({leftArrow:"higher rated and newer product",
                         rightArrow:"lower rated and older product",
                         item:"top product that recently came out"})
    

    function handleChange(currIndex, item){
        const leftProd = featuredFive[currIndex]
        const prod = currIndex=== 4? featuredFive[0] : featuredFive[currIndex+1]
        const rightProd = currIndex=== 3 ? featuredFive[0] :
                          currIndex===4 ? featuredFive[1] : featuredFive[currIndex]
        setAccessibleObj({
            leftArrow: `This product is ${leftProd.title}. 
                        It is rated ${leftProd.meanRating} stars 
                        and was added ${leftProd.dateAdded}.`,
            rightArrow: `This product is ${prod.title}. 
                        It is rated ${prod.meanRating} stars 
                        and was added ${prod.dateAdded}.`,
            item: `This product is ${rightProd.title}. 
                  It is rated ${rightProd.meanRating} stars 
                  and was added ${rightProd.dateAdded}.`
        })
    }


    return (
        <div>
        <Carousel
            ariaLabel={"Top five featured items"}
            autoPlay={true}
            emulateTouch={true}
            infiniteLoop={true}
            interval={5000}
            labels={accessibleObj}
            onChange={handleChange}
            showArrows={true}
            showStatus={true}
            transitionTime={1000}
            useKeyboardArrows={true}>
            <Link 
                to={`/product/${featuredFive[0].id}`} 
                state={{prodData: featuredFive[0]}}>
                <FeaturedProduct 
                    featured={featuredFive[0]}
                    className="featured"/>
            </Link>
            <Link 
                to={`/product/${featuredFive[1].id}`} 
                state={{prodData: featuredFive[1]}}>
                <FeaturedProduct 
                    featured={featuredFive[1]}
                    className="featured"/>
            </Link>
            <Link 
                to={`/product/${featuredFive[2].id}`} 
                state={{prodData: featuredFive[2]}}>
                <FeaturedProduct 
                    featured={featuredFive[2]}
                    className="featured"/>
            </Link>
            <Link 
                to={`/product/${featuredFive[3].id}`} 
                state={{prodData: featuredFive[3]}}>
                <FeaturedProduct 
                    featured={featuredFive[3]}
                    className="featured"/>
            </Link>
            <Link 
                to={`/product/${featuredFive[4].id}`} 
                state={{prodData: featuredFive[4]}}>
                <FeaturedProduct 
                    featured={featuredFive[4]}
                    className="featured"/>
            </Link>
        </Carousel>
        </div>
    )
}