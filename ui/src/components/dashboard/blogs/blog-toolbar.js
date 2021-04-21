import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Box, IconButton, makeStyles } from "@material-ui/core";
import { ArrowBack, Refresh } from "@material-ui/icons";

import ToolbarLayout from "../toolbar-layout";

import { createBlog, getBlogs, updateBlog } from "../../../store/actions/blog";

export default function BlogToolbar({ isNew }) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const router = useHistory();

  const onSave = () => {
    const onSuccess = (blog) => {
      router.push(blog.slug);
    };
    if (isNew) {
      dispatch(createBlog(onSuccess));
    } else {
      dispatch(updateBlog());
    }
  };

  return (
    <ToolbarLayout>
      <Box>
        <IconButton
          className={classes.back}
          onClick={() => router.push("/dashboard/blogs")}
        >
          <ArrowBack />
        </IconButton>
      </Box>
      <Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onSave}
        >
          Save details
        </Button>
      </Box>
    </ToolbarLayout>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},

  button: {
    margin: theme.spacing(0, 1),
  },
}));
