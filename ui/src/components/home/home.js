import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, makeStyles, Box } from "@material-ui/core";
import { getCategories, getLocations } from "../../store/actions/product";
import Categories from "./categories/categories";
import Locations from "./locations/locations";
import Banners from "./banners/banners";

const HomePage = () => {
  const classes = useStyles();
  const categories = useSelector((state) => state.product.categories);
  const locations = useSelector((state) => state.product.locations);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getLocations());
  }, [dispatch]);

  return (
    <Box pt={2} className={classes.root}>
      {/* <Grid container spacing={2}> */}
      <Grid item xs={12}>
        <Banners />
      </Grid>
      <Grid item xs={12}>
        <Box p={2}>
          <Typography variant="button">Explore categories</Typography>
        </Box>
        <Categories categories={categories} />
      </Grid>
      <Grid item xs={12}>
        <Box p={2}>
          <Typography variant="button">Explore states</Typography>
        </Box>
        <Locations locations={locations} />
      </Grid>
      {/* </Grid> */}
      <Box p={2} />
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default HomePage;
