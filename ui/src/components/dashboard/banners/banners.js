import React, { useEffect } from "react";

import {
  Grid,
  Box,
  Container,
  makeStyles,
  Card,
  Typography,
} from "@material-ui/core";

import BannersToolbar from "./banner-toolbar";
import { useDispatch, useSelector } from "react-redux";
import { getBanners } from "../../../store/actions/product";
import BannerCard from "./banner-card";

export default function Banners() {
  const classes = useStyles();

  const banners = useSelector((state) => state.product.banners);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <BannersToolbar />
        <Box p={1} />
        <Grid container spacing={2}>
          {banners && banners.length > 0 ? (
            banners.map((banner) => (
              <Grid item xs={12} sm={6} md={4}>
                <BannerCard banner={banner} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Card>
                <Box p={3} textAlign="center">
                  <Typography>No banners found !</Typography>
                </Box>
              </Card>{" "}
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));
