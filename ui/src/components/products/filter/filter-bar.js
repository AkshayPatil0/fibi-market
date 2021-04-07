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
  Slider,
} from "@material-ui/core";

import { Input as InputIcon } from "@material-ui/icons";

// import NavItem from "./nav-item";
import { useDispatch, useSelector } from "react-redux";

import PriceFilter from "./price";

const FilterBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const router = useHistory();
  // const user = useSelector((state) => state.auth.currentUser);
  // const items = useMenuItems(user);

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
    <Box>
      <Box px={2} py={4}>
        <Typography variant="h5">Filter</Typography>
      </Box>
      <Box px={2} py={4}>
        <PriceFilter />
      </Box>
    </Box>
  );

  return (
    <Box>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          className={classes.mobileDrawerWrapper}
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
          className={classes.desktopDrawerWrapper}
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawerWrapper: {
    position: "relative",
  },
  desktopDrawer: {
    width: 300,
    // top: 64,
    position: "absolute",
    // height: "calc(100% - 64px)",
    minHeight: "100vh",
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

FilterBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

FilterBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default FilterBar;
