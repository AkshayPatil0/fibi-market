import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import QueryString from "qs";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import SignIn from "./signin";
import SignUp from "./signup";

const AuthLayout = () => {
  const classes = useStyles();
  const { path } = useRouteMatch();

  const router = useHistory();
  const location = useLocation();
  const user = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    if (user) {
      const { redirectUrl } = QueryString.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      router.push(redirectUrl || "/");
    }
  }, [location, router, user]);

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Box className={classes.header} onClick={() => router.push("/")}>
            <Typography variant="h6" noWrap>
              FIBI market
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <Switch>
          <Route path={`${path}/signin`} component={SignIn} />
          <Route path={`${path}/signup`} component={SignUp} />
        </Switch>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    "& > h6": {
      cursor: "pointer",
    },
  },
  content: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
export default AuthLayout;
