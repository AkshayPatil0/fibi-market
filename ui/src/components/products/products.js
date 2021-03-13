import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Button,
  CssBaseline,
  LinearProgress,
  Box,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

import ProductToolbar from "../toolbar/product-toolbar";
import Product from "./product-grid-item";

import { useProductsHook } from "./product-hook";
import ProductFilter from "../filter/product-filter";

export default function Products() {
  const classes = useStyles();

  const { isLoading } = useProductsHook();
  const products = useSelector((state) => state.product.products);

  if (!products || isLoading) {
    return <LinearProgress />;
  }

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <ProductToolbar />
        <ProductFilter />
        <Box mt={3}>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item key={product.id} lg={4} md={6} xs={12}>
                <Product className={classes.productCard} product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination color="primary" count={3} size="small" />
        </Box>
        <Box p={3} />
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
  },
  productCard: {
    height: "100%",
  },
}));

// export default ProductList;
