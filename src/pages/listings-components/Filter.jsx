import React from "react"
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

//Filter menu for Products page based on type of product, price, and number in stock
export default function Filter(props){
  const {catList, setSelected, priceList} = props
  const stockList = ["5", "10", "20", "50", "50+"]
  const [open, setOpen] = React.useState(true)

  const [checked, setChecked] = React.useState(
    {
      "categories": catList.map((category) => ({
        key: category,
        value: false
      })).reduce((obj, item) => ({...obj, [item.key]: item.value}), {}),
      "prices": priceList.map((price) => ({
        key: price,
        value: false
      })).reduce((obj, item) => ({...obj, [item.key]: item.value}), {}),
      "inStock": stockList.map((amount) => ({
        key: amount,
        value: false
      })).reduce((obj, item) => ({...obj, [item.key]: item.value}), {})
    }
  )
    
  const handleGroupChange = (event) => {
    const id = event.target.id
    setChecked(prev => {
      for (let key in prev[id]){
        prev[id][key] = event.target.checked
      }
    })
  }

  const handleCatChange = (event) => {
    const id = event.target.id
    setChecked(prev => {
      prev.categories[id] = event.target.checked
      return prev
    })
    setSelected(prev => prev.categories.push(id))
  }

  const handlePriceChange = (event) => {
    const id = event.target.id
    setChecked(prev => {
      prev.prices[id] = event.target.checked
      return prev
    })
    setSelected(prev => prev.prices.push(id))
  }

  const handleStockChange = (event) => {
    const id = event.target.id
    setChecked(prev => {
      prev.inStock[id] = event.target.checked
      return prev
    })
    setSelected(prev => prev.inStock.push(id))
  }

  const catChildren = (
    <Box sx={{ display: 'flex', flexDirection: 'row', ml: 3 }}>
      {catList.map((category) => {
        return (
        <FormControlLabel
          label={category.charAt(0).toUpperCase() + category.slice(1)}
          control={<Checkbox
                    id={category} 
                    checked={checked.categories[category]} 
                    onChange={handleCatChange} />}
      />)
      })}
    </Box>
  )

  const priceChildren = (
    <Box sx={{ display: 'flex', flexDirection: 'row', ml: 3 }}>
      {priceList.map((price) => {
        return (
        <FormControlLabel
          label={price}
          control={<Checkbox
                    id={price}
                    checked={checked.prices[price]} 
                    onChange={handlePriceChange} />}
      />)
      })}
    </Box>
  )

  const stockChildren = (
    <Box sx={{ display: 'flex', flexDirection: 'row', ml: 3 }}>
      {stockList.map((amount) => {
        return (
        <FormControlLabel
          label={category.charAt(0).toUpperCase() + category.slice(1)}
          control={<Checkbox 
                    id={amount}
                    checked={checked.inStock[amount]} 
                    onChange={handleStockChange} />}
      />)
      })}
    </Box>
  )

  const handleClick = () => {
      setOpen(!open)
  }


  return (
    <List>
        <ListItemButton onClick={handleClick}>
            <ListItemText primary="Filters" />
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <div class="categories">
                <FormControlLabel
                    label="Categories"
                    control={
                      <Checkbox
                        id="categories"
                        checked={Object.values(checked.categories
                          .filter((a) => a).length === catList.length)}
                        indeterminate={(0 < Object.values(checked.categories
                          .filter((a) => a)).length < catList.length)}
                        onChange={handleGroupChange}
                      />
                    }
                  />
                  {catChildren}
                </div>
                <div class="prices">
                <FormControlLabel
                    label="Price Range"
                    control={
                      <Checkbox
                        id="prices"
                        checked={Object.values(checked.prices
                          .filter((a) => a).length === catList.length)}
                        indeterminate={(0 < Object.values(checked.prices
                          .filter((a) => a)).length < catList.length)}
                        onChange={handleGroupChange}
                      />
                    }
                  />
                  {priceChildren}
                </div>
                <div class="categories">
                <FormControlLabel
                    label="Number in Stock"
                    control={
                      <Checkbox
                        id="inStock"
                        checked={Object.values(checked.inStock
                          .filter((a) => a).length === catList.length)}
                        indeterminate={(0 < Object.values(checked.inStock
                          .filter((a) => a)).length < catList.length)}
                        onChange={handleGroupChange}
                      />
                    }
                  />
                  {stockChildren}
                </div>
            </Box>
        </Collapse>
    </List>
  )
}