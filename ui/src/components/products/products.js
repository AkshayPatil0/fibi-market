import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import qs from "qs";

import {
  LinearProgress,
  Box,
  makeStyles,
  Grid,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

import ProductGridItem from "./product-grid-item";
import { getProducts } from "../../store/actions/product";
import FilterBar from "./filter/filter-bar";

export default function Products() {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  const products = useSelector((state) => state.product.products);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const run = async () => {
      const query = qs.parse(location.search, { ignoreQueryPrefix: true });
      setIsLoading(true);
      try {
        await dispatch(getProducts(query));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, [location.search, dispatch]);

  return (
    <div className={classes.root}>
      <Grid container spacing={isMobile ? 0 : 2}>
        <FilterBar />
        <Grid item container xs={12} md={9} spacing={isMobile ? 0 : 1}>
          {isLoading && (
            <Box width="100%" pt={0.5}>
              <LinearProgress />
            </Box>
          )}
          {!isLoading &&
            products.map((product) => (
              <Grid item xs={6} sm={4} md={3} key={product.id}>
                <div className={classes.productCard}>
                  <ProductGridItem product={product} />
                </div>
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Box p={3} />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  filterButton: {
    position: "fixed",
    bottom: "10px",
    right: "10px",
    // backgroundColor: theme.palette.primary.main,
  },
  filterIcon: {
    color: theme.palette.secondary.main,
    fill: theme.palette.secondary.main,
  },

  // productCard: {
  //   [theme.breakpoints.up("lg")]: {
  //     padding: theme.spacing(2),
  //   },
  // },
}));
