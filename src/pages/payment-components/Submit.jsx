import React from "react"
import { nanoid } from 'nanoid'

//Confirmation message after user has checked out
export default function Submit(props){
    const model = nanoid()
    const {fullyComplete} = props
    if (!fullyComplete){
        return null
    }

    return (
        <div class="main">
            <p>We received your order! Your confirmation number is <bold>{model.id}</bold></p>
            <p>Feel free to take a screenshot of this page or check your email for a copy of your invoice.</p>
            <p>We hope you enjoy the rest of your day and come back soon!</p>
        </div>
    )
}