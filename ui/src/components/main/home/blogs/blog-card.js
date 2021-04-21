import React from "react";
import {
  Typography,
  makeStyles,
  Card,
  CardContent,
  Grid,
  Box,
  useTheme,
  useMediaQuery,
  Button,
  CardMedia,
} from "@material-ui/core";

import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { getDateTime } from "../../../../utils";

export default function BlogCard({ blog, alt }) {
  const classes = useStyles();

  const router = useHistory();

  return (
    <Card className={classes.root}>
      <CardMedia image={blog.cover} />
      <img src={blog.cover} alt={blog.title} width="100%" />
      <Box className={classes.content}>
        <Typography variant="caption" color="textSecondary">
          {getDateTime(blog.createdAt)}
        </Typography>
        <Typography variant="h6">
          <b>{blog.title}</b>
        </Typography>
        <Typography>{blog.description}</Typography>
        <Box p={0.1} />
        <Typography component={Link} to={`/blogs/${blog.slug}`} color="primary">
          Read more
        </Typography>
      </Box>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      boxShadow: theme.shadows[5],
    },
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  image: {
    height: "100%",

    maxHeight: "256px",
    width: "100%",
    objectFit: "contain",
  },
}));
