import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  makeStyles,
  Modal,
  Switch,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getBlog, setBlog } from "../../../store/actions/blog";
import BlogToolbar from "./blog-toolbar";
import BlogDetails from "../../common/blogDetails";
import BlogForm from "./blogForm";

import helpImage from "../../../assets/images/markdown-cheatsheet.jpg";
import { Close, Info } from "@material-ui/icons";
import MultipleImagePicker from "../../common/multiple-image-picker";
import { getImagesFormData } from "../../../utils";

import * as api from "../../../api";

export default function Blog() {
  const classes = useStyles();

  const [isPreview, setIsPreview] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  const { slug } = useParams();
  const dispatch = useDispatch();

  const blog = useSelector((state) => state.blog.blog);
  useEffect(() => {
    if (slug === "new") {
      setIsNew(true);
    } else {
      setIsNew(false);
      dispatch(getBlog(slug));
    }

    return () => dispatch(setBlog(null));
  }, [dispatch, slug]);

  const addBlogImage = async (e) => {
    const res = await api.addBlogImage(
      blog.id,
      getImagesFormData(e.target.files)
    );
    dispatch(setBlog({ ...blog, images: res.data.images }));
  };

  const removeBlogImage = async (uri) => {
    const res = await api.removeBlogImage(blog.id, { uri });
    dispatch(setBlog({ ...blog, images: res.data.images }));
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={12}>
            <BlogToolbar isNew={isNew} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Card className={classes.card}>
              <CardHeader
                title="Blog details"
                action={
                  <>
                    <IconButton onClick={() => setOpenHelp(true)}>
                      <Info />
                    </IconButton>
                    <FormControlLabel
                      control={
                        <Switch
                          value={isPreview}
                          onChange={(e) => setIsPreview(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Preview"
                    />
                  </>
                }
              />
              <Divider />
              <CardContent>
                {isPreview ? <BlogDetails blog={blog} /> : <BlogForm />}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box pb={1}>
              <MultipleImagePicker
                previews={blog.images}
                onAdd={addBlogImage}
                onRemove={removeBlogImage}
              />
            </Box>

            <Card>
              <List>
                {blog.images?.map((img) => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={img} variant="square" />
                    </ListItemAvatar>
                    <ListItemSecondaryAction>
                      <Button variant="outlined">Copy url</Button>{" "}
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Modal open={openHelp} onClose={() => setOpenHelp(false)}>
        <div className={classes.modal}>
          <Card className={classes.helpCard}>
            <CardHeader
              title="Help"
              action={
                <IconButton onClick={() => setOpenHelp(false)}>
                  <Close />
                </IconButton>
              }
            />
            <CardContent className={classes.helpContent}>
              <img src={helpImage} alt="help" width="100%" />
            </CardContent>
          </Card>
        </div>
      </Modal>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 0, 10),
  },
  card: {
    overflow: "visible",
  },
  modal: {
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
    position: "absolute",
    width: "50%",
    minWidth: 360,
    height: "90vh",
  },
  helpCard: {
    height: "100%",
  },
  helpContent: {
    overflow: "auto",
    height: "100%",
  },
}));
