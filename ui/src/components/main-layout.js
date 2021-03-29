import { makeStyles } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router";
import Header from "./header/header";
import ProductDetails from "./products/productDetails";
import Products from "./products/products";

const MainLayout = () => {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <div className={classes.content}>
        <Switch>
          <Route path="/products/:id" component={ProductDetails} />
          <Route path="/products" component={Products} />
        </Switch>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  content: {
    height: "100%",
    minHeight: "100vh",
  },
}));

export default MainLayout;
