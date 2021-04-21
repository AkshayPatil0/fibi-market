import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

import TextInput from "../../common/input";

import { useDispatch, useSelector } from "react-redux";
import { setBlog } from "../../../store/actions/blog";
import RelevancesForm from "./relevances-form";

export default function BlogForm() {
  const classes = useStyles();

  const blog = useSelector((state) => state.blog.blog);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setBlog({ ...blog, [e.target.name]: e.target.value }));
  };

  return (
    <Grid container spacing={1} className={classes.root}>
      <TextInput
        label="Title"
        name="title"
        value={blog.title}
        handleChange={handleChange}
        autoFocus
        margin="dense"
        required
      />
      <TextInput
        label="Description"
        name="description"
        value={blog.description}
        handleChange={handleChange}
        margin="dense"
        multiline
        rows={4}
      />
      <TextInput
        label="Body"
        name="body"
        value={blog.body}
        handleChange={handleChange}
        margin="dense"
        multiline
        rows={16}
      />
      <RelevancesForm />
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},
}));
