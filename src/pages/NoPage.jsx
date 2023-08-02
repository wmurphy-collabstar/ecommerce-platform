import React from 'react'

//Page that appears when a user goes to an undefined link
export default function NoPage (props){
    return (
        <div class="main">
            <h1>404 Error</h1>
            <p>This page doesn't exist. 
                We recommend you go back to your previous page.</p>
        </div>
    )
}