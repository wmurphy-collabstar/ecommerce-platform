import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import ListSubheader from '@mui/material/ListSubheader'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

/* The sorting feature for the Products page bsed on price, rating, date added
and number in stock
*/
export default function Sort(props){
  const {setSortingOption} = props

  function handleChange(event){
    setSortingOption(event.target.value)
  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="sortingOptions">Sorting Options</InputLabel>
        <Select 
          defaultValue="" 
          id="sortingOptions" 
          label="Sorting Options"
          onChange={handleChange}>
          <MenuItem value="">None</MenuItem>
          <ListSubheader>Price</ListSubheader>
          <MenuItem value={"Lowest to Highest"}>Lowest to Highest</MenuItem>
          <MenuItem value={"Highest to Lowest"}>Highest to Lowest</MenuItem>
          <ListSubheader>Rating</ListSubheader>
          <MenuItem value={"Best Rated to Worst Rated"}>Best Rated to Worst Rated</MenuItem>
          <MenuItem value={"Worst Rated to Best Rated"}>Worst Rated to Best Rated</MenuItem>
          <ListSubheader>Date Added</ListSubheader>
          <MenuItem value={"Newest to Oldest"}>Newest to Oldest</MenuItem>
          <MenuItem value={"Oldest to Newest"}>Oldest to Newest</MenuItem>
          <ListSubheader>In Stock</ListSubheader>
          <MenuItem value={"Most to Least"}>Most to Least</MenuItem>
          <MenuItem value={"Least to Most"}>Least to Most</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}