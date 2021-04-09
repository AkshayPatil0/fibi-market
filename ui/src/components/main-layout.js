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
          <Route path="/products" component={Products} />
          <Route path="/cart" component={Cart} />
          <Route path="/orders" component={Orders} />
          <Route path="/profile" component={Profile} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
  },
  header: {
    height: "64px",
  },
  content: {
    // height: "calc(100% - 64px)",

    paddingTop: "64px",
    [theme.breakpoints.down("sm")]: {
      paddingRight: 0,
      paddingLeft: 0,
    },
    minHeight: "100vh",
  },
}));

export default MainLayout;
