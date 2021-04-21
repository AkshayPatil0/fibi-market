import React from "react";

import { Box, makeStyles, Grid } from "@material-ui/core";

import ProductGridItem from "./product-grid-item";

export default function ProductsGrid({ isLoading, products }) {
  const classes = useStyles();

  return (
    <>
      {!isLoading &&
        products.map((product) => (
          <Grid item xs={6} sm={4} md={3} key={product.id}>
            <Box className={classes.productCard} height="100%">
              <ProductGridItem product={product} />
            </Box>
          </Grid>
        ))}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  productCard: {
    height: "100%",
  },
}));
