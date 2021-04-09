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

function CategoryItem({ category }) {
  const classes = useStyle();
  const [showChildren, setShowChildren] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    minPrice: "",
    maxPrice: "",
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
      });
    }
  }, [category]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(editCategory(category.id, formData));
  };
  return (
    <>
      <ListItem button onClick={() => setShowChildren(!showChildren)}>
        {showChildren ? <ExpandLess /> : <ExpandMore />}
        <ListItemText
          primary={<Typography variant="h6">{category.title}</Typography>}
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
