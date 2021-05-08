import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Box, makeStyles } from "@material-ui/core";

import { getBlogs } from "../../../../store/actions/blog";

import BlogCard from "./blog-card";

export default function Blogs() {
  const classes = useStyles();

  // const [isLoading, setIsLoading] = useState(false);

  const blogs = useSelector((state) => state.blog.blogs);

  const dispatch = useDispatch();

  useEffect(() => {
    const run = async () => {
      // setIsLoading(true);
      await dispatch(getBlogs());
      // setIsLoading(false);
    };
    run();
  }, [dispatch]);

  return (
    <div className={classes.root}>
      {blogs &&
        blogs.map((blog, i) => (
          <Grid item xs={12} sm={3} key={i}>
            <Box p={2}>
              <BlogCard blog={blog} />
            </Box>
          </Grid>
        ))}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    display: "flex",
    flexWrap: "wrap",
  },
  productCard: {
    height: "100%",
  },
}));
