import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  makeStyles,
  Grid,
  useTheme,
  useMediaQuery,
  Card,
  Typography,
  Breadcrumbs,
} from "@material-ui/core";

import { fetchProduct } from "../../api";
import ProductsGrid from "./product-grid";
import { NavLink as Link } from "react-router-dom";

export default function Wishlist() {
  const classes = useStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const user = useSelector((state) => state.auth.currentUser);
  const wishlist = useSelector((state) => state.auth.wishlist);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let productsArr = await Promise.all(
          wishlist.map(async (id) => {
            const res = await fetchProduct(id);
            return res.data;
          })
        );
        setProducts(productsArr);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [wishlist, dispatch]);

  const emptyResult = (
    <Card>
      <Box
        py={5}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h4" color="textPrimary">
          Your wishlist is empty !
        </Typography>
        {!user && (
          <Typography variant="h6" color="textSecondary">
            Login to see the items you added previously.
          </Typography>
        )}
      </Box>
    </Card>
  );

  return (
    <div className={classes.root}>
      <Grid item container xs={12} spacing={isMobile ? 0 : 1}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to="/">
              Home
            </Link>
            <Typography color="textPrimary">Wishlist</Typography>
          </Breadcrumbs>
        </Grid>
        {!isLoading && products && products.length > 0 ? (
          <ProductsGrid products={products} isLoading={isLoading} />
        ) : (
          <Grid item xs={12}>
            {!isLoading && emptyResult}
          </Grid>
        )}
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
}));
