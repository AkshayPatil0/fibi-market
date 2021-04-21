import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
  fade,
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Badge,
  Menu,
} from "@material-ui/core";
import {
  ShoppingCart,
  Favorite,
  Menu as MenuIcon,
  Person,
} from "@material-ui/icons";

import SideBar from "./sidebar";
import { useHistory, useLocation } from "react-router";
import { Box } from "@material-ui/core";
import { menuItems } from "./menu-items";
import NavItemList from "./nav-item-list";
import { useSelector } from "react-redux";
import SearchBar from "./search-bar";

export default function Header() {
  const classes = useStyles();

  const user = useSelector((state) => state.auth.currentUser);
  const wishlist = useSelector((state) => state.auth.wishlist);
  const cart = useSelector((state) => state.order.cart);

  const cartItemCount = cart?.products?.length;
  const wishlistItemCount = wishlist?.length;
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const menuButton = user ? (
    <div className={classes.sectionDesktop}>
      <Box display="flex" alignItems="center">
        <Typography variant="h6">Hi, {user.firstName}</Typography>
        <IconButton
          variant="text"
          // edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <Person />
        </IconButton>
      </Box>
    </div>
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

  const location = useLocation();
  const router = useHistory();

  const appbarRef = useRef(null);
  const rootRef = useRef();
  // const [appbarHeight, setAppbarHeight] = useState();
  // let appbarHeight;

  useEffect(() => {
    rootRef.current.style.padding = `${appbarRef.current?.offsetHeight / 2}px`;
  });

  return (
    <div className={classes.root} ref={rootRef}>
      <AppBar position="fixed" ref={appbarRef}>
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
          <div className={classes.sectionDesktop}>
            <SearchBar />
          </div>
          <div className={classes.grow} />
          <div className={classes.icons}>
            {menuButton}
            <IconButton
              aria-label={`show ${wishlistItemCount} wishlist items`}
              color="inherit"
              onClick={() => router.push("/wishlist")}
            >
              <Badge badgeContent={wishlistItemCount} color="secondary">
                <Favorite />
              </Badge>
            </IconButton>

            <IconButton
              aria-label={`show ${cartItemCount} cart items`}
              color="inherit"
              onClick={() => router.push("/cart")}
            >
              <Badge badgeContent={cartItemCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
        {location.pathname === "/" && (
          <div className={clsx(classes.sectionMobile, classes.mobileSearch)}>
            <SearchBar />
          </div>
        )}
      </AppBar>

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
  root: {
    minHeight: "64px",
    maxWidth: "100vw",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
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
  mobileSearch: {
    width: "100%",
    padding: theme.spacing(0, 2, 2, 2),
  },
  icons: {
    display: "flex",
  },
  profileBox: {
    display: "flex",
  },
}));
