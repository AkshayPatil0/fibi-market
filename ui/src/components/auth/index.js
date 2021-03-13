import { Container } from "@material-ui/core";
import React from "react";

import { Route, Switch, useRouteMatch } from "react-router-dom";
import SignIn from "./signin";
import SignUp from "./signup";

const AuthLayout = () => {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/signin`} component={SignIn} />
      <Route path={`${path}/signup`} component={SignUp} />
    </Switch>
  );
};

export default AuthLayout;
