import React, { useState } from "react";

import {
  Typography,
  Box,
  makeStyles,
  Card,
  CardContent,
} from "@material-ui/core";

import { getCategoriesState } from "../../../utils";
import { useHistory } from "react-router";

export default function Categories({ categories }) {
  const classes = useStyles();

  // const categories = getCategoriesState();

  const router = useHistory();

  return (
    <Box display="flex" justifyContent="space-around">
      {categories &&
        categories.map((category) => (
          <Box flex={1} mx={2}>
            <Card
              className={classes.card}
              onClick={() =>
                router.push(
                  `/products/?${
                    category.isLocation ? "location" : "category"
                  }=${category.id}`
                )
              }
            >
              <CardContent>
                <Typography variant="h6" align="center">
                  {category.title}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  card: {
    cursor: "pointer",
  },
  categories: {
    padding: theme.spacing(1),
  },
  empty: {
    textAlign: "center",
  },
}));
