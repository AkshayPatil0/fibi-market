import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./app.css";

import { getProfile } from "./store/actions/auth";
import { getCategories, getLocations } from "./store/actions/product";

import { makeStyles } from "@material-ui/core/styles";

import AuthLayout from "./components/auth";
import DashboardLayout from "./components/dashboard";
import MainLayout from "./components/main-layout";
import { Route, Switch } from "react-router";

const App = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
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

  if (isLoading) {
    return (
      <div className={classes.root}>
        <LinearProgress />
      </div>
    );
  }
  return (
    <div className={classes.root}>
      {/* {isLoading && <LinearProgress />} */}
      <Switch>
        <Route path="/auth" component={AuthLayout} />
        <Route path="/dashboard" component={DashboardLayout} />
        <Route path="/" component={MainLayout} />
      </Switch>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  body: {
    height: "100vh",
  },
}));
export default App;
