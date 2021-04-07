import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect } from "react";

import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { getCurrentUserState } from "../../utils";
import SignIn from "./signin";
import SignUp from "./signup";

const AuthLayout = () => {
  const classes = useStyles();
  const { path, url } = useRouteMatch();

  const router = useHistory();
  const location = useLocation();
  const user = getCurrentUserState();
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [location]);

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
