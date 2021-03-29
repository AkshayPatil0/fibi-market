import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import {
  LinearProgress,
  Box,
  Container,
  makeStyles,
  Avatar,
  Typography,
  IconButton,
  Grid,
} from "@material-ui/core";
import { Filter } from "react-feather";

import ProductGridItem from "./product-grid-item";
import { getCurrentUserState, getProductsState } from "../../utils";
import { deleteProduct, getProducts } from "../../store/actions/product";
import FilterBar from "./filter-bar";

export default function Products() {
  const classes = useStyles();
  const user = getCurrentUserState();

  const [isLoading, setIsLoading] = useState(false);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const products = getProductsState();

  const [rows, setRows] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const run = async () => {
      setIsLoading(true);
      try {
        await dispatch(
          getProducts({ vendor: user.role === "vendor" ? user.id : undefined })
        );
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (!products.length > 0) run();
  }, []);

  const onDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id));
    } catch (err) {
      console.error(err);
    }
  };

  const router = useHistory();

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <div className={classes.root}>
      <IconButton className={classes.filterButton}>
        <Filter className={classes.filterIcon} />
      </IconButton>
      <FilterBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Container maxWidth={false}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={4}>
                  {products.map((product) => (
                    <ProductGridItem product={product} />
                  ))}
                </Grid>
              </Grid>
              <Box p={3} />
            </Container>
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
      paddingLeft: 256,
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
    height: "100%",
  },
}));
