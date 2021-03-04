import React from "react";
import AppBar from "@material-ui/core/AppBar"
import Button from "@material-ui/core/Button"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import "./App.scss"

export const App = () => (
    <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="title">
                OCMS
            </Typography>
            <Button color="inherit">Login</Button>
        </Toolbar>
    </AppBar>
)
