// import React from "react";
// import { Link } from "react-router-dom";
// import { Grid, Button } from "@material-ui/core";
// import { useDispatch, useSelector } from "react-redux";
// import { signout } from "../../store/actions/auth";
// import { useGoogleLogout } from "react-google-login";
// const HeaderComponent = () => {
//   const user = useSelector((state) => state.auth.currentUser);
//   // const preventDefault = (event) => event.preventDefault();
//   const preventDefault = (event) => {};

//   const { signOut, loaded } = useGoogleLogout({
//     clientId:
//       "246767929126-2lb3hs7qu531bl5jt1hb427sgnni0dob.apps.googleusercontent.com",
//     onLogoutSuccess: () => dispatch(signout()),
//     onFailure: (err) => console.error(err),
//     cookiePolicy: "single_host_origin",
//   });

//   const dispatch = useDispatch();

//   const onSignout = () => {
//     if (loaded) {
//       signOut();
//     } else {
//       dispatch(signout());
//     }
//   };

//   const authMenu = user ? (
//     <>
//       <Grid>
//         <Button m={2} variant="text">
//           <Link to="/dashboard">{user.firstName}</Link>
//         </Button>
//       </Grid>

//       <Grid>
//         <Button m={2} variant="text" onClick={onSignout}>
//           Signout
//         </Button>
//       </Grid>
//     </>
//   ) : (
//     <>
//       <Grid>
//         <Link to="/auth/signin">
//           <Button m={2} variant="text">
//             Signin
//           </Button>
//         </Link>
//       </Grid>

//       <Grid>
//         <Link to="/auth/signup">
//           <Button m={2} variant="text">
//             Signup
//           </Button>
//         </Link>
//       </Grid>
//     </>
//   );

//   return (
//     <Grid container>
//       <Grid>
//         <Link to="/" onClick={preventDefault}>
//           <Button m={2} variant="text">
//             FIBI
//           </Button>
//         </Link>
//       </Grid>
//       <Grid>
//         <Link to="/products" onClick={preventDefault}>
//           <Button m={2} variant="text">
//             Products
//           </Button>
//         </Link>
//       </Grid>

//       <Grid>
//         <Link to="/cart" onClick={preventDefault}>
//           <Button m={2} variant="text">
//             Cart
//           </Button>
//         </Link>
//       </Grid>

//       <Grid>
//         <Link to="/orders" onClick={preventDefault}>
//           <Button m={2} variant="text">
//             Orders
//           </Button>
//         </Link>
//       </Grid>
//       {authMenu}
//     </Grid>
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
  MenuItem,
  Menu,
} from "@material-ui/core";
import {
  ShoppingCart,
  Favorite,
  AccountCircle,
  Search as SearchIcon,
  Menu as MenuIcon,
  ExpandLess,
  Input as InputIcon,
  ExpandMore,
} from "@material-ui/icons";

import SideBar from "./sidebar";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Box } from "@material-ui/core";
import { getCurrentUserState } from "../../utils";
import { useMenuItems } from "./menu-items-hook";
import NavItemList from "./nav-item-list";

export default function Header() {
  const classes = useStyles();

  const user = getCurrentUserState();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const menuItems = useMenuItems();

  const menuButton = user ? (
    <Button
      variant="text"
      edge="end"
      aria-label="account of current user"
      aria-haspopup="true"
      color="inherit"
      className={classes.sectionDesktop}
      onMouseEnter={(event) => setAnchorEl(event.currentTarget)}
      onClick={(event) => setAnchorEl(event.currentTarget)}
    >
      <Box display="flex" alignItems="center">
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
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
    >
      <NavItemList />
    </Menu>
  );
  const router = useHistory();

  return (
    <div className={classes.grow}>
      <AppBar position="static">
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
