import React from "react";
import { Route, Switch } from "react-router";
import Header from "./header/header";
import Products from "./products/products";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/products" component={Products} />
      </Switch>
    </div>
  );
};

export default MainLayout;
