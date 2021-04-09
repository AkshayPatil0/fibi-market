import React from "react";

import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Container,
  makeStyles,
} from "@material-ui/core";
import CategoryList from "./category-list";
import { useSelector } from "react-redux";

export default function Categories() {
  const classes = useStyles();

  const categories = useSelector((state) => state.product.categories);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="All categories" />
              <Divider />
              <CardContent>
                <CategoryList categories={categories} />
              </CardContent>
            </Card>
          </Grid>
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
