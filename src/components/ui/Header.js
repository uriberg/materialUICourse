import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import {Link} from 'react-router-dom';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useTheme} from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";


import logo from '../../assets/logo.svg';

function ElevationScroll(props) {
    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "3em",
        [theme.breakpoints.down("md")]: {
            marginBottom: "2em"
        },
        [theme.breakpoints.down("xs")]: {
            marginBottom: "1.25em"
        }
    },
    logo: {
        height: "8em",
        [theme.breakpoints.down("md")]: {
            height: "7em"
        },
        [theme.breakpoints.down("xs")]: {
            height: "5.5em"
        }
    },
    logoContainer: {
        padding: 0,
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    tabContainer: {
        marginLeft: "auto"
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: "25px"
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: "50px",
        marginLeft: "50px",
        marginRight: "25px",
        height: "45px",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    },
    menu: {
        backgroundColor: theme.palette.common.blue,
        color: "white",
        borderRadius: 0
    },
    menuItem: {
        ...theme.typography.tab,
        opacity: 0.7,
        "&:hover": {
            opacity: 1
        }
    },
    drawerIconContainer: {
        "&:hover": {
            backgroundColor: "transparent"
        },
        marginLeft: "auto"
    },
    drawerIcon: {
        height: "50px",
        width: "50px"
    },
    drawer: {
        backgroundColor: theme.palette.common.blue
    },
    drawerItem: {
        ...theme.typography.tab,
        color: "white",
        opacity: 0.7
    },
    drawerItemEstimate: {
        backgroundColor: theme.palette.common.orange
    },
    drawerItemSelected: {
       "& .MuiListItemText-root": {
           opacity: 1
       }
    },
    appBar: {
        zIndex: theme.zIndex.modal + 1
    }
}));

export default function Header(props) {
    const classes = useStyles();
    const theme = useTheme();
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const [openDrawer, setOpenDrawer] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);


    const handleChange = (e, newValue) => {
        props.setValue(newValue)
    };

    const handleClick = (e) => {
        console.log(e.currentTarget);
        setAnchorEl(e.currentTarget);
        setOpenMenu(true);
    };

    const handleMenuItemClick = (e, i) => {
        setAnchorEl(null);
        setOpenMenu(false);
        props.setSelectedIndex(i);
    };

    const handleClose = (e) => {
        setAnchorEl(null);
        setOpenMenu(false);
    };

    const menuOptions = [{name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0},
        {name: "Custom Software Development", link: "/customsoftware", activeIndex: 1, selectedIndex: 1},
        {name: "Mobile App Development", link: "/mobileapps", activeIndex: 1, selectedIndex: 2},
        {name: "Website Development", link: "/websites", activeIndex: 1, selectedIndex: 3}
    ];

    const routes = [
        {name: "Home", link: "/", activeIndex: 0}, {name: "Services", link: "/services", activeIndex: 1},
        {name: "The Revolution", link: "/revolution", activeIndex: 2}, {name: "About Us", link: "/about", activeIndex: 3},
        {name: "Contact Us", link: "/contact", activeIndex: 4}
    ];

    useEffect(() => {
        console.log(window.location.pathname);
        console.log(props.value);
        [...menuOptions, ...routes].forEach(route => {
            console.log(route);
            switch (window.location.pathname) {
                case `${route.link}`:
                    if (props.value !== route.activeIndex) {
                        props.setValue(route.activeIndex);
                        if (route.selectedIndex && route.selectedIndex !== props.selectedIndex) {
                            props.setSelectedIndex(route.selectedIndex)
                        }
                    }
                    break;
                default:
                    break;
            }
        });

    }, [props.value, props.selectedIndex, menuOptions, routes, props])

    const tabs = (
        <React.Fragment>
            <Tabs value={props.value} onChange={handleChange}
                  indicatorColor="primary" className={classes.tabContainer}>
                <Tab className={classes.tab} component={Link} to="/" label="Home"/>
                <Tab aria-owns={anchorEl ? "simple-menu" : undefined}
                     aria-haspopup={anchorEl ? true : undefined} onMouseOver={event => handleClick(event)}
                     className={classes.tab} component={Link} to="/services" label="Services"/>
                <Tab
                    className={classes.tab} component={Link} to="/revolution" label="The Revolution"/>
                <Tab
                    className={classes.tab} component={Link} to="/about" label="About Us"/>
                <Tab
                    className={classes.tab} component={Link} to="/contact" label="Contact Us"/>
            </Tabs>
            <Button variant="contained" color="secondary" className={classes.button}>Free Estimate</Button>
            <Menu id="simple-menu" anchorEl={anchorEl} open={openMenu} onClose={handleClose} style={{zIndex: 1302}}
                  MenuListProps={{onMouseLeave: handleClose}} classes={{paper: classes.menu}} elevation={0}>
                {menuOptions.map((option, i) => (
                    <MenuItem key={`${option}${i}`} component={Link} to={option.link}
                              classes={{root: classes.menuItem}}
                              onClick={(event) => {
                                  handleMenuItemClick(event, i);
                                  props.setValue(1);
                                  handleClose()
                              }} selected={i === props.selectedIndex && props.value === 1}>
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    );

    const drawer = (
        <React.Fragment>
            <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} open={openDrawer}
            onClose={() => setOpenDrawer(false)} onOpen={() => setOpenDrawer(true)}
            classes={{paper: classes.drawer}}>
                <div className={classes.toolbarMargin}/>
              <List disablePadding>
                  <ListItem  classes={{selected: classes.drawerItemSelected}} onClick={() => {setOpenDrawer(false); props.setValue(0)}} divider button component={Link} to="/" selected={props.value === 0}>
                    <ListItemText className={classes.drawerItem} disableTypography>Home</ListItemText>
                  </ListItem>
                  <ListItem classes={{selected: classes.drawerItemSelected}} onClick={() => {setOpenDrawer(false); props.setValue(1)}} divider button component={Link} to="/services" selected={props.value === 1}>
                      <ListItemText className={classes.drawerItem} disableTypography>Services</ListItemText>
                  </ListItem>
                  <ListItem  classes={{selected: classes.drawerItemSelected}} onClick={() => {setOpenDrawer(false); props.setValue(2)}} divider button component={Link} to="/revolution" selected={props.value === 2}>
                      <ListItemText className={classes.drawerItem} disableTypography>The Revolution</ListItemText>
                  </ListItem>
                  <ListItem  classes={{selected: classes.drawerItemSelected}} onClick={() => {setOpenDrawer(false); props.setValue(3)}} divider button component={Link} to="/about" selected={props.value === 3}>
                      <ListItemText className={classes.drawerItem} disableTypography>About Us</ListItemText>
                  </ListItem>
                  <ListItem  classes={{selected: classes.drawerItemSelected}} onClick={() => {setOpenDrawer(false); props.setValue(4)}} divider button component={Link} to="/contact" selected={props.value === 4}>
                      <ListItemText className={classes.drawerItem} disableTypography>Contact Us</ListItemText>
                  </ListItem>
                  <ListItem  classes={{root: classes.drawerItemEstimate, selected: classes.drawerItemSelected}} onClick={() => {setOpenDrawer(false); props.setValue(5)}} divider button component={Link} to="/estimate" selected={props.value === 5}>
                      <ListItemText className={classes.drawerItem} disableTypography>Free Estimate</ListItemText>
                  </ListItem>
              </List>
            </SwipeableDrawer>
            <IconButton className={classes.drawerIconContainer} onClick={() => setOpenDrawer(!openDrawer)} disableRipple>
                <MenuIcon className={classes.drawerIcon}/>
            </IconButton>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <ElevationScroll {...props}>
                <AppBar position="fixed" color="primary" className={classes.appBar}>
                    <Toolbar disableGutters={true}>
                        <Button className={classes.logoContainer} component={Link} to="/"
                                onClick={() => props.setValue(0)} disableRipple>
                            <img src={logo} alt="company logo" className={classes.logo}/>
                        </Button>
                        {matches ? drawer : tabs}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin}/>
        </React.Fragment>

    )
}
