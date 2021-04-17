import { Container, makeStyles } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router";
import Cart from "./cart/cart";
import Header from "./header/header";

import HomePage from "./home/home";
import Orders from "./orders/orders";
import ProductDetails from "./products/productDetails";
import Products from "./products/products";
import Profile from "./profile/profile";
import Settings from "./settings/settings";
import Wishlist from "./wishlist/wishlist";

const MainLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <div className={classes.header}> */}
      <Header />
      {/* </div> */}

      <Container maxWidth="lg" className={classes.content}>
        <Switch>
          <Route path="/products/:id" component={ProductDetails} />
          <Route path="/cart" component={Cart} />
          <Route path="/wishlist" component={Wishlist} />
          <Route path="/orders" component={Orders} />
          <Route path="/profile" component={Profile} />
          <Route path="/products" component={Products} />
          <Route path="/settings" component={Settings} />
          <Route path="/categories/:category" component={Products} />
          <Route path="/locations/:location" component={Products} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    // overflowX: "hidden",
  },
  content: {
    // height: "calc(100% - 64px)",

    // paddingTop: "64px",
    [theme.breakpoints.down("sm")]: {
      paddingRight: 0,
      paddingLeft: 0,
    },
    minHeight: "calc(100vh - 64px)",
  },
}));

export default MainLayout;
