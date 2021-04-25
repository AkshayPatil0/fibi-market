import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import qs from "qs";

import {
  Box,
  makeStyles,
  Grid,
  useTheme,
  useMediaQuery,
  Card,
  Typography,
} from "@material-ui/core";

import { getProducts } from "../../../store/actions/product";
import FilterBar from "./filter/filter-bar";
import Toolbar from "./toolbar/toolbar";
import { fetchCategory } from "../../../api";
import ProductsGrid from "./product-grid";

export default function Products() {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  const products = useSelector((state) => state.product.products);

  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    const getCategory = async (id) => {
      const res = await fetchCategory(id);
      setSelectedCategory(res.data);
    };
    const fetchProducts = async () => {
      const query = qs.parse(location.search, { ignoreQueryPrefix: true });
      setIsLoading(true);
      try {
        await dispatch(getProducts({ ...params, ...query }));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
    if (params.category) {
      getCategory(params.category);
    } else {
      setSelectedCategory(null);
    }

    // if (params.location){}
  }, [location.search, dispatch, params]);

  const emptyResult = (
    <Card>
      <Box
        minHeight="60vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h4" color="textPrimary">
          Sorry, no results found !
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Try searching with different{" "}
          {selectedCategory ? "filters" : "keywords"}.
        </Typography>
      </Box>
    </Card>
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={isMobile ? 0 : 1}>
        <FilterBar selectedCategory={selectedCategory} />
        <Grid
          item
          container
          xs={12}
          md={9}
          spacing={1}
          alignContent="flex-start"
        >
          <Grid item container xs={12}>
            <Toolbar category={selectedCategory} isLoading={isLoading} />
          </Grid>
          <Grid item container xs={12} spacing={isMobile ? 0 : 1}>
            {!isLoading && products && products.length > 0 ? (
              <ProductsGrid products={products} isLoading={isLoading} />
            ) : (
              <Grid item xs={12}>
                {!isLoading && emptyResult}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
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
  productCard: {
    height: "100%",
  },
}));
