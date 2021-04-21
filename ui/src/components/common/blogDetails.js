import React from "react";
import { Box, Divider, makeStyles, Typography } from "@material-ui/core";
import Markdown from "react-markdown";

export default function BlogDetails({ blog }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box>
        <Box className={classes.blogHeader} p={1.5}>
          <Box className={classes.blogDetails}>
            <Box pb={1}>
              <Typography variant="h2">
                <b>{blog.title}</b>
              </Typography>
            </Box>
            <Typography color="textSecondary">
              <i>{new Date(blog?.createdAt || Date.now()).toDateString()}</i>
            </Typography>
            <Box pt={2} pb={1}>
              <Typography variant="h6" color="textSecondary">
                <b>{blog.description}</b>
              </Typography>
            </Box>
          </Box>
          <img
            src={blog.cover}
            alt={blog.title}
            className={classes.blogCover}
          />
        </Box>
        <Divider />
        <Box px={3} pt={2} pb={1} className={classes.markdown}>
          <Markdown>{blog.body}</Markdown>
        </Box>
      </Box>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},
  // blogHeader: {
  //   position: "relative",
  // },
  blogCover: {
    maxHeight: 256,
    width: "100%",
  },
  // blogDetails: {
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  // },
  markdown: {
    ["& > h1"]: { margin: ".67em 0" },
    ["& > h2"]: { margin: ".75em 0" },
    ["& > h3"]: { margin: ".83em 0" },
    ["& > h4, p, blockquote, ul, fieldset, form, ol, dl, dir, menu"]: {
      margin: "1.12em 0",
    },
    ["$ > h5"]: { margin: "1.5em 0" },
    ["& > h6"]: { margin: "1.67em 0" },
    ["& > pre, tt, code, kbd, samp"]: { fontFamily: "monospace" },
    ["& > menu, dd"]: { marginLeft: "40px" },
    ["& > blockquote"]: {
      borderLeft: "5px solid #ccc",
      margin: "1.5em 10px",
      padding: "0.5em 10px",
    },
    ["& > * > code, pre"]: {
      background: "#F1F1F1",
      border: "1px solid #E1E1E1",
      borderRadius: "4px",
      fontSize: "90%",
      padding: ".2rem .5rem",
      fontFamily:
        "'Roboto Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace",
      overflow: "auto",
    },
    ["& > pre > code"]: {
      background: "#F1F1F1",
      border: "none",
      borderRadius: "0",
      fontSize: "inherit",
      padding: "0",
    },
    ["& > p > img, em"]: {
      margin: "0 auto",
      display: "block",
      width: "fit-content",
      maxWidth: "100%",
      maxHeight: 360,
      objectFit: "contain",
    },
  },
}));
