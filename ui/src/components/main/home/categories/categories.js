import React from "react";

import { Box, makeStyles } from "@material-ui/core";

import CategoryItem from "./category-item";

export default function Categories({ categories }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.wrapper}>
        {categories &&
          categories.map((category, i) => (
            <Box px={1} key={i}>
              <CategoryItem category={category} />
            </Box>
          ))}
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: theme.spacing(1, 0),
    overflowX: "auto",
    "&::-webkit-scrollbar": {
      width: 0,
    },
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-evenly",
    flex: 1,
  },
}));
