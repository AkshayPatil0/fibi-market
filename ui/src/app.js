import { CssBaseline, LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./app.css";

import { getProfile, getWishlist } from "./store/actions/auth";
import { getCategories, getLocations } from "./store/actions/product";
import { getCart } from "./store/actions/order";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

import AuthLayout from "./components/auth";
import DashboardLayout from "./components/dashboard";
import MainLayout from "./components/main";
import { Route, Switch } from "react-router";
import AlertDialog from "./components/common/alert";
import Snackbar from "./components/common/snakbar";

import lightTheme from "./themes/light";
import darkTheme from "./themes/dark";
import { setTheme } from "./store/actions/app";

const getTheme = (theme) => {
  switch (theme) {
    case "light":
      return lightTheme;
    case "dark":
      return darkTheme;
    default:
      return lightTheme;
  }
};

const App = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  // const [themeState, setThemeState] = useState("");
  const theme = useSelector((state) => state.app.theme);

  const user = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    const run = async () => {
      setIsLoading(true);
      try {
        await dispatch(getProfile());
        dispatch(getCategories());
        dispatch(getLocations());
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, [dispatch]);

  useEffect(() => {
    const run = async () => {
      try {
        dispatch(getCart());
        dispatch(getWishlist());
      } catch (err) {
        console.log(err);
      }
    };
    run();
  }, [user, dispatch]);

  useEffect(() => {
    if (!theme) {
      //   setThemeState(theme);
      // } else {
      dispatch(setTheme(localStorage.getItem("theme")));
    }
  }, [theme, dispatch]);

  if (isLoading) {
    return (
      <div className={classes.root}>
        <LinearProgress />
      </div>
    );
  }

  return (
    <ThemeProvider theme={getTheme(theme)}>
      <CssBaseline />
      <div className={classes.root}>
        <Switch>
          <Route path="/auth" component={AuthLayout} />
          <Route path="/dashboard" component={DashboardLayout} />
          <Route path="/" component={MainLayout} />
        </Switch>
        <AlertDialog />
        <Snackbar />
      </div>
    </ThemeProvider>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    maxWidth: "100vw",
  },
  body: {
    height: "100vh",
  },
}));
export default App;
