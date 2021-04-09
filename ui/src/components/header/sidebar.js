import React, { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  Typography,
  makeStyles,
} from "@material-ui/core";
import NavItemList from "./nav-item-list";
import { useSelector } from "react-redux";

const SideBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const user = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column" fontSize={14}>
      {user && (
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
            {user.email}
          </Typography>
        </Box>
      )}
      <Divider />
      <NavItemList />
    </Box>
  );

  return (
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

SideBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

SideBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default SideBar;
