import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import qs from "qs";

import {
  LinearProgress,
  Box,
  Container,
  makeStyles,
  Avatar,
  Typography,
  IconButton,
  Grid,
  Hidden,
} from "@material-ui/core";
import { Filter } from "react-feather";

import ProductGridItem from "./product-grid-item";
import { getCurrentUserState, getProductsState } from "../../utils";
import { deleteProduct, getProducts } from "../../store/actions/product";
import FilterBar from "./filter/filter-bar";

export default function Products() {
  const classes = useStyles();
  const user = getCurrentUserState();

  const [isLoading, setIsLoading] = useState(false);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const products = getProductsState();

  const [rows, setRows] = useState([]);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const run = async () => {
      const query = qs.parse(location.search, { ignoreQueryPrefix: true });
      console.log({ query });
      setIsLoading(true);
      try {
        await dispatch(getProducts(query));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    // if (!products.length > 0)
    run();
  }, []);

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <div className={classes.root}>
      <Hidden lgUp>
        <IconButton
          className={classes.filterButton}
          onClick={() => setMobileNavOpen(!isMobileNavOpen)}
        >
          <Filter className={classes.filterIcon} />
        </IconButton>
      </Hidden>
      <FilterBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Grid container>
              {products.map((product) => (
                <Grid item xs={6} sm={4} md={3} key={product.id}>
                  <div className={classes.productCard}>
                    <ProductGridItem product={product} />
                  </div>
                </Grid>
              ))}
            </Grid>
            <Box p={3} />
          </div>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    minHeight: "100vh",
    width: "100%",
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
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    // paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 300,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    flexDirection: "column",
  },
  content: {
    flex: "1 1 auto",
    overflow: "auto",
    padding: theme.spacing(2, 0),
  },
  productCard: {
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(2),
    },
  },
}));
