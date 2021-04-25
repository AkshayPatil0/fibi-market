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
  CardHeader,
  CardContent,
  Divider,
  Button,
} from "@material-ui/core";

import { fetchProduct } from "../../../api";
import ProductsGrid from "./product-grid";
import { NavLink } from "react-router-dom";

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
    <Box className={classes.empty}>
      <Typography variant="h4" color="textPrimary">
        Your wishlist is empty !
      </Typography>
      {!user && (
        <>
          <Typography variant="h6" color="textSecondary">
            Login to see the items you added previously.
          </Typography>
          <Box p={2}>
            <Button
              variant="contained"
              color="primary"
              component={NavLink}
              to="/auth/signin"
            >
              Login
            </Button>
          </Box>
        </>
      )}
    </Box>
  );

  return (
    <div className={classes.root}>
      <Grid item container xs={12} spacing={isMobile ? 0 : 1}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="My wishlist" />
            <Divider />
            <CardContent>
              {!isLoading && products && products.length > 0 ? (
                <ProductsGrid products={products} isLoading={isLoading} />
              ) : (
                <Grid item xs={12}>
                  {!isLoading && emptyResult}
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    minHeight: "60vh",
  },

  empty: {
    padding: theme.spacing(5, 0),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    minHeight: "50vh",
  },
}));
