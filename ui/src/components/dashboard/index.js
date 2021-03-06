import React, { useEffect, useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import Products from "../products/products";
import { useSelector } from "react-redux";

import Orders from "../orders/orders";
import Cart from "../cart/cart";
import Profile from "../profile/profile";
import NewProduct from "../products/new";
import Users from "../users/users";

const DashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const { path } = useRouteMatch();
  const user = useSelector((state) => state.auth.currentUser);
  const router = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin");
    }
  }, [location]);

  if (!user) {
    return <div />;
  }

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Switch>
              <Route exact path={`${path}`}>
                <Redirect to={`${path}/account`} />
              </Route>
              <Route exact path={`${path}/products`}>
                <Products />
              </Route>
              <Route path={`${path}/products/new`} component={NewProduct} />
              <Route
                path={`${path}/products/update/:id`}
                component={NewProduct}
              />
              <Route path={`${path}/orders`} component={Orders} />
              <Route path={`${path}/cart`} component={Cart} />
              <Route path={`${path}/account`} component={Profile} />
              <Route path={`${path}/users`} component={Users} />

              <Route path={`${path}/*`}>
                <Redirect to={`${path}`} />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    // overflow: 'hidden',
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
    padding: theme.spacing(2, 0, 0, 0),
  },
}));

export default DashboardLayout;
