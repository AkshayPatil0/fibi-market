import React, { useState } from "react";
import clsx from "clsx";
import {
  fade,
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  InputBase,
  Badge,
  Menu,
  Avatar,
} from "@material-ui/core";
import {
  ShoppingCart,
  Favorite,
  Search as SearchIcon,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
} from "@material-ui/icons";

import SideBar from "./sidebar";
import { useHistory, useLocation } from "react-router";
import { Box } from "@material-ui/core";
import { getInitials } from "../../utils";
import { useMenuItems } from "./menu-items-hook";
import NavItemList from "./nav-item-list";
import { useSelector } from "react-redux";

export default function Header() {
  const classes = useStyles();

  const user = useSelector((state) => state.auth.currentUser);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const menuItems = useMenuItems();

  const menuButton = user ? (
    <Button
      variant="text"
      edge="end"
      aria-label="account of current user"
      aria-haspopup="true"
      color="inherit"
      className={classes.sectionDesktop}
      onClick={(event) => setAnchorEl(event.currentTarget)}
    >
      <Box display="flex" alignItems="center">
        <Avatar style={{ height: "1.5em", width: "1.5em" }} src={user.avatar}>
          {getInitials(user)}
        </Avatar>
        <Box p={0.5} />
        <Typography variant="h6">{user.firstName}</Typography>
        {anchorEl ? <ExpandLess /> : <ExpandMore />}
      </Box>
    </Button>
  ) : (
    <Button
      variant="contained"
      color="secondary"
      className={classes.sectionDesktop}
      onClick={() => router.push("/auth/signin")}
    >
      login
    </Button>
  );

  const optionsMenu = (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      transformOrigin={{
        horizontal: "center",
        vertical: "top",
      }}
      keepMounted
      onClick={handleCloseMenu}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
    >
      <NavItemList />
    </Menu>
  );

  const searchBar = (
    <Toolbar color="transparent" className={classes.sectionMobile}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    </Toolbar>
  );

  const location = useLocation();
  const router = useHistory();

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={clsx(classes.menuButton, classes.sectionMobile)}
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setIsMobileNavOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
            <Typography className={classes.title} variant="h6" noWrap>
              FIBI market
            </Typography>
          </Box>
          <div className={clsx(classes.search, classes.sectionDesktop)}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.icons}>
            {menuButton}
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <Favorite />
              </Badge>
            </IconButton>

            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {/* <Toolbar /> */}
      {location.pathname === "/" && searchBar}

      <SideBar
        onMobileClose={() => setIsMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        items={menuItems}
      />
      {optionsMenu}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // display: "none",
    // [theme.breakpoints.up("sm")]: {
    //   display: "block",
    // },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "unset",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

//   );
// };

// export default HeaderComponent;
