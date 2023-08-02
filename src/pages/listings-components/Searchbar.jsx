import React from "react"
import TextField from "@mui/material/TextField"

//Search bar for products page
export default function Searchbar(props){
    const {setSearchInput} = props
    function inputHandler (event) {
        const lowerCase = event.target.value.toLowerCase()
        setSearchInput(lowerCase)
    }

    return (
        <div className="search">
            <TextField
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search"
            />
        </div>
    )
}