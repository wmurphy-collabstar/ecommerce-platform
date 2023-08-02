import React from "react"
import {Link, useNavigate} from "react-router-dom"

//Way to welcome user to beginning of checkout
export default function Welcome(props){
    const [currentForm, setCurrentForm] = props.state
    if (currentForm !== "welcome"){
        return null
    }

    function handleClick(){
        setCurrentForm("order")
        const nav = useNavigate()
        nav("/checkout")
    }
    return (
        <h1 class="main">
            We hope you found everything you need. 
            We just need to answer a few more questions before we send you on your way!
            <Link onClick={handleClick}>Great, I'm ready</Link>
        </h1>
    )
}