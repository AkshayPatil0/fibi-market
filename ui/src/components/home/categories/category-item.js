import React from "react";

import { Typography, Box, makeStyles, Card } from "@material-ui/core";

import { useHistory } from "react-router";

function CategoryItem({ category }) {
  const classes = useStyles();
  const router = useHistory();

  return (
    <Card
      className={classes.card}
      onClick={() => router.push(`/categories/${category.slug}`)}
    >
      <Box className={classes.imageBox}>
        <img
          src={category.image}
          alt={category.title}
          className={classes.image}
        />
      </Box>
      <Box className={classes.title}>
        <Typography variant="h6" align="center">
          <b>{category.title}</b>
        </Typography>
      </Box>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  card: {
    cursor: "pointer",
    position: "relative",
  },
  imageBox: {
    height: 120,
    width: 120,
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
  title: {
    textAlign: "center",
    position: "absolute",
    backgroundColor: "rgb(0 0 0 / 50%)",
    bottom: 0,
    right: 0,
    padding: theme.spacing(0.5, 0),
    width: "100%",
    color: theme.palette.background.paper,
  },
}));

export default CategoryItem;
