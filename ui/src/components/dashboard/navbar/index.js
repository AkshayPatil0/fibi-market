import React, { useEffect } from "react";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
  ListItem,
} from "@material-ui/core";

import { Input as InputIcon } from "@material-ui/icons";

import NavItem from "./nav-item";
import { useDispatch, useSelector } from "react-redux";
import { useMenuItems } from "./menu-items-hook";
import { signout } from "../../../store/actions/auth";

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const router = useHistory();
  const user = useSelector((state) => state.auth.currentUser);
  const items = useMenuItems(user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const onSignout = async () => {
    try {
      await dispatch(signout());
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  const content = (
    <Box height="100%" display="flex" flexDirection="column" fontSize={14}>
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/dashboard/account"
        />
        <Typography className={classes.name} color="textPrimary" variant="h6">
          {user.firstName + " " + user.lastName}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.role}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
      <Box p={2} pb={0}>
        <List>
          <ListItem disableGutters>
            <Button className={classes.button} onClick={onSignout}>
              <InputIcon className={classes.icon} size="20" />
              <span className={classes.title}>Signout</span>
            </Button>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  title: {
    marginRight: "auto",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  name: {
    fontSize: theme.spacing(2),
    paddingTop: 10,
  },
}));

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
