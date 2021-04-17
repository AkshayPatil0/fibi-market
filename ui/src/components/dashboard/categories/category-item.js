import React, { useEffect, useState } from "react";
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

import { deleteCategory, editCategory } from "../../../store/actions/product";
import CategoryList from "./category-list";
import { getObjectUrl } from "../../../utils";

function CategoryItem({ category }) {
  const classes = useStyle();
  const [showChildren, setShowChildren] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    minPrice: "",
    maxPrice: "",
    image: "",
  });

  const onCloseEdit = () => {
    setOpenEdit(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (category) {
      setFormData({
        title: category.title,
        minPrice: category.minPrice || "",
        maxPrice: category.maxPrice || "",
        image: category.image || "",
      });
    }
  }, [category]);

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

    dispatch(editCategory(category.id, fData));
  };
  return (
    <>
      <ListItem button>
        {showChildren ? <ExpandLess /> : <ExpandMore />}
        <ListItemText
          primary={<Typography variant="h6">{category.title}</Typography>}
          onClick={() => setShowChildren(!showChildren)}
        ></ListItemText>
        <Edit color="primary" onClick={() => setOpenEdit(true)} />
        <Delete
          color="error"
          onClick={() => dispatch(deleteCategory(category.id))}
        />
      </ListItem>
      <Collapse in={showChildren} timeout="auto" unmountOnExit>
        <CategoryList categories={category.childrens} parent={category} />
      </Collapse>
      <Modal open={openEdit}>
        <Box display="flex" height="100vh">
          <Card className={classes.editCard}>
            <form onSubmit={onSubmit}>
              <CardHeader
                title="Edit category"
                action={
                  <IconButton onClick={onCloseEdit}>
                    <Close />
                  </IconButton>
                }
              />
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
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
                          alt={category.title}
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
                  />
                  <TextInput
                    name="minPrice"
                    label="Min. price"
                    value={formData.minPrice}
                    handleChange={handleChange}
                    sm={6}
                  />
                  <TextInput
                    name="maxPrice"
                    label="Max. price"
                    value={formData.maxPrice}
                    handleChange={handleChange}
                    sm={6}
                  />
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
    maxWidth: 256,
    outline: 0,
  },
}));

export default CategoryItem;
