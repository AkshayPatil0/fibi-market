import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import {
  LinearProgress,
  Box,
  Container,
  makeStyles,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";

import BlogsToolbar from "./blogs-toolbar";

import Table from "../../common/table";
import { deleteBlog, getBlogs } from "../../../store/actions/blog";

export default function Blogs() {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  const blogs = useSelector((state) => state.blog.blogs);

  const [rows, setRows] = useState([]);

  const dispatch = useDispatch();

  const options = [
    { head: "Title", key: "title" },
    { head: "Description", key: "description" },
    { head: "Author", key: "author" },
    { head: "Edit", key: "edit" },
    { head: "Delete", key: "delete" },
  ];

  const router = useHistory();
  useEffect(() => {
    const run = async () => {
      setIsLoading(true);
      await dispatch(getBlogs());
      setIsLoading(false);
    };
    run();
  }, [dispatch]);

  useEffect(() => {
    const onDelete = async (id) => {
      try {
        await dispatch(deleteBlog(id));
      } catch (err) {
        console.error(err);
      }
    };
    let newRows = [];
    blogs?.forEach((blog) => {
      let row = {};

      row.id = blog.id;
      row.title = (
        <Typography color="textPrimary" variant="body1">
          <Link to={`/blogs/${blog.id}`}>{blog?.title}</Link>
        </Typography>
      );
      row.description = (
        <Typography color="textPrimary" variant="body1">
          {blog?.description}
        </Typography>
      );
      row.author = (
        <Typography color="textPrimary" variant="body1">
          {blog?.author?.email}
        </Typography>
      );
      row.edit = (
        <IconButton
          size="small"
          onClick={() => router.push(`/dashboard/blogs/${blog.slug}`)}
        >
          <Edit color="primary" />
        </IconButton>
      );
      row.delete = (
        <IconButton size="small" onClick={() => onDelete(blog.id)}>
          <Delete color="secondary" />
        </IconButton>
      );

      newRows.push(row);
    });
    setRows(newRows);
  }, [blogs, router, dispatch]);

  console.log(blogs);
  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <BlogsToolbar />
        <Box mt={3}>
          <Table rows={rows} options={options} />
        </Box>
        <Box p={3} />
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
  },
  productCard: {
    height: "100%",
  },
}));
