import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Grid,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
  Modal,
  Card,
  CardHeader,
  IconButton,
  Divider,
  CardContent,
  Box,
  makeStyles,
  Button,
  CardActions,
} from "@material-ui/core";
import {
  ExpandLess,
  ExpandMore,
  Delete,
  Edit,
  Close,
} from "@material-ui/icons";

import TextInput from "../../common/input";
import { deleteLocation, editCategory } from "../../../store/actions/product";
import LocationList from "./location-list";
import { getObjectUrl } from "../../../utils";
import AsyncSelect from "../../common/select/async-select";
import { loadBlogs } from "../../common/select/loaders";
import * as api from "../../../api";

function LocationItem({ location }) {
  const classes = useStyle();
  const [showChildren, setShowChildren] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [blogOption, setBlogOption] = useState();
  const [formData, setFormData] = useState({
    title: "",
    image: null,
  });

  const onCloseEdit = () => {
    setOpenEdit(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const getBlogOption = async () => {
      const res = await api.fetchBlog(location.blog);
      setBlogOption({ label: res.data.title, value: res.data.slug });
    };

    if (location) {
      setFormData({
        title: location.title || "",
        image: location.image || "",
        description: location.description || "",
      });

      if (location.blog) getBlogOption();
    }
  }, [location]);

  const handleChange = (e) => {
    if (e.target.name === "image" && e.target.files.length > 0) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();

    let fData = new FormData();

    for (const key of Object.keys(formData)) {
      fData.set(key, formData[key]);
    }

    dispatch(editCategory(location.id, fData));
  };

  return (
    <>
      <ListItem button>
        {showChildren ? <ExpandLess /> : <ExpandMore />}
        <ListItemText
          primary={<Typography variant="h6">{location.title}</Typography>}
          onClick={() => setShowChildren(!showChildren)}
        ></ListItemText>
        <Edit color="primary" onClick={() => setOpenEdit(true)} />
        <Delete
          color="error"
          onClick={() => dispatch(deleteLocation(location.id))}
        />
      </ListItem>
      <Collapse in={showChildren} timeout="auto" unmountOnExit>
        <LocationList locations={location.childrens} parent={location} />
      </Collapse>
      <Modal open={openEdit}>
        <Box display="flex" height="100vh">
          <Card className={classes.editCard}>
            <form onSubmit={onSubmit}>
              <CardHeader
                title="Edit location"
                action={
                  <IconButton onClick={onCloseEdit}>
                    <Close />
                  </IconButton>
                }
              />
              <Divider />
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    {formData.image ? (
                      <Box component="label">
                        <img
                          src={
                            typeof formData.image === "string"
                              ? formData.image
                              : getObjectUrl(formData.image)
                          }
                          height="100%"
                          width="100%"
                          alt={location.title}
                          className={classes.image}
                        />
                        <input
                          type="file"
                          name="image"
                          hidden
                          onChange={handleChange}
                        />
                      </Box>
                    ) : (
                      <Button
                        size="small"
                        variant="contained"
                        component="label"
                      >
                        <Typography>Choose image</Typography>
                        <input
                          type="file"
                          name="image"
                          hidden
                          onChange={handleChange}
                        />
                      </Button>
                    )}
                  </Grid>
                  <TextInput
                    name="title"
                    label="Title"
                    value={formData.title}
                    handleChange={handleChange}
                    margin="dense"
                  />
                  <TextInput
                    name="description"
                    label="Description"
                    value={formData.description}
                    handleChange={handleChange}
                    margin="dense"
                    multiline
                    rows={4}
                  />
                  <Grid item xs={12}>
                    <AsyncSelect
                      placeholder="Select blog"
                      loadOptions={loadBlogs}
                      value={blogOption}
                      handleChange={handleChange}
                      name="blog"
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                <Button type="submit" color="primary" variant="text" fullWidth>
                  Save
                </Button>
              </CardActions>
            </form>
          </Card>
        </Box>
      </Modal>
    </>
  );
}

const useStyle = makeStyles((theme) => ({
  editCard: {
    margin: "auto",
    width: "50%",
    maxWidth: 480,
    minWidth: 256,
    outline: 0,
  },
  image: {
    maxHeight: 256,
    objectFit: "contain",
  },
}));

export default LocationItem;
