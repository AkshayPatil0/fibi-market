import { makeStyles } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router";
import Cart from "./cart/cart";
import Header from "./header/header";

import HomePage from "./home/home";
import ProductDetails from "./products/productDetails";
import Products from "./products/products";

const MainLayout = () => {
  const classes = useStyles();

  return (
    <>
      {/* <div className={classes.header}> */}
      <Header />
      {/* </div> */}

      <div className={classes.content}>
        <Switch>
          <Route path="/products/:id" component={ProductDetails} />
          <Route path="/products" component={Products} />
          <Route path="/cart" component={Cart} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    height: "10vh",
  },
  content: {
    height: "calc(100% - 64px)",
    // minHeight: "100vh",
  },
}));

export default MainLayout;
