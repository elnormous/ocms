import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from "@material-ui/core/Button";
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import ViewList from "@material-ui/icons/ViewList";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import "./App.scss";

const handleProfileMenuOpen = (event) => {
    console.log("Profile");
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function App() {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {['Data1', 'Data2', 'Data3', 'Data4'].map((text, index) => (
                    <ListItem button key={text}>
                    <ListItemIcon><ViewList /></ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Data1', 'Data2', 'Data3', 'Data4'].map((text, index) => (
                    <ListItem button key={text}>
                    <ListItemIcon><ViewList /></ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
    
    const container = window.document.body;

    return <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    OCMS
                </Typography>

                <Button color="inherit">Login</Button>

                <IconButton edge="end" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                classes={{
                    paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Typography paragraph>
                Test
            </Typography>
            <Typography paragraph>
                Test
            </Typography>
        </main>
    </div>;
}
