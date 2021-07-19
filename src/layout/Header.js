import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import Popper from '@material-ui/core/Popper';
import { Fade, Paper, Slide} from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    [theme.breakpoints.up("sm")]: {
      zIndex: theme.zIndex.drawer + 1
    }
  },
  rightIcons: {
    marginLeft: theme.spacing(0.5)
  },
  spacer: {
    flexGrow: 1
  },
  accountPopOver: {
    zIndex: '99999999',
    left: '-3rem !important'
    // background: 'white'
  }
}));

const Header = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const history = useHistory();

    const handleMouseOver = (event) => {
        event.persist();
        if(!open){
            setAnchorEl(event.target);
            setOpen(true)
        }
    };

    const handleMouseLeave = (event) => {
        if(open){
            setAnchorEl(null);
            setOpen(false)
        }
    };

    const id = open ? 'simple-popover' : undefined;

    const logoutAccount = () => {
        history.push('/login');
    }

    return (
        <AppBar position="fixed" className={classes.appbar}>
            <Toolbar onMouseLeave={handleMouseLeave}>
                <div className={classes.spacer} />
                <div id="accountBtn" onMouseEnter={handleMouseOver}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        className={classes.rightIcons}   
                        
                        // onClick={handleClick} 
                        
                    >
                        <AccountCircleIcon/>
                    </IconButton>
                </div>
                <Popper className={classes.accountPopOver} id={id} open={open} anchorEl={anchorEl} transition>
                    {({ TransitionProps }) => (
                    <Slide direction="down" {...TransitionProps} timeout={350}>
                        <List component="nav">
                            <ListItem style={{background: 'white', boxShadow: '0px 3px 6px #00000029'}} button onClick={logoutAccount}>
                                <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        </List>
                    </Slide>
                 )}
                </Popper>
            </Toolbar>
        </AppBar>
    );
}

export default Header;