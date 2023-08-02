import React from "react"
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

export default function OrderSummary(props){
    const [open, setOpen] = React.useState(true)

    const handleClick = () => {
        setOpen(!open)
    }


    return (
        <List>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <ShoppingBasketRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Order Details" />
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
                    <div>
                        <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue="Hello World"
                        />
                        <TextField
                        disabled
                        id="outlined-disabled"
                        label="Disabled"
                        defaultValue="Hello World"
                        />
                        <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        />
                        <TextField
                        id="outlined-read-only-input"
                        label="Read Only"
                        defaultValue="Hello World"
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                        <TextField
                        id="outlined-number"
                        label="Number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                        <TextField id="outlined-search" label="Search field" type="search" />
                        <TextField
                        id="outlined-helperText"
                        label="Helper text"
                        defaultValue="Default Value"
                        helperText="Some important text"
                        />
                    </div>
                </Box>
            </Collapse>
        </List>
    )
}