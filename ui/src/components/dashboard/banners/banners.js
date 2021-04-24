import React, { useEffect, useState } from "react";

import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Container,
  makeStyles,
  CardMedia,
  Box,
} from "@material-ui/core";

import TextInput from "../../common/input";
import * as api from "../../../api";
import BannersToolbar from "./banner-toolbar";

export default function Categories() {
  const classes = useStyles();

  // const categories = useSelector((state) => state.product.categories);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const getBanners = async () => {
      const res = await api.fetchBanners();
      setBanners(res.data);
    };
    getBanners();
  }, []);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <BannersToolbar />
        <Grid container>
          {banners.map((banner) => (
            <Grid item xs={12} sm={6} md={4}>
              <Box p={1}>
                <Card>
                  <CardMedia image={banner.cover} />
                  <CardContent>
                    <Grid container></Grid>
                    <TextInput />
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
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
  categories: {
    padding: theme.spacing(1),
  },
  empty: {
    textAlign: "center",
  },
}));
