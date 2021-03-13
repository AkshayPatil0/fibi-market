import React, { useState } from "react";

import {
  Button,
  CssBaseline,
  Typography,
  Container,
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  GridList,
  GridListTile,
  makeStyles,
} from "@material-ui/core";

import { useHistory, useParams } from "react-router";
import { useNewProductHook } from "./product-hook";

import TextInput from "../common/input";
import { useSelector } from "react-redux";

export default function NewProduct() {
  const classes = useStyles();

  const { previews, handleChange, formData, onSubmit } = useNewProductHook();

  const categories = useSelector((state) => state.product.categories);

  console.log({ previews });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          New Product
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextInput
            id="title"
            label="Title"
            name="title"
            value={formData.title}
            handleChange={handleChange}
            autoFocus
          />
          <TextInput
            id="price"
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            handleChange={handleChange}
          />
          <TextInput
            id="stock"
            label="Stock"
            name="stock"
            type="number"
            value={formData.stock}
            handleChange={handleChange}
          />
          <Grid item xs={12}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
              margin="dense"
            >
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                variant="outlined"
                label="Category"
                margin="dense"
                native
              >
                <option value="" label="" />
                <CategoriesOption categories={categories} />
              </Select>
            </FormControl>
          </Grid>
          <Input
            id="images"
            name="images"
            type="file"
            onChange={handleChange}
            inputProps={{ multiple: true }}
          />
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {previews.map((img) => (
              <GridListTile key={img} cols={1}>
                <img src={img} alt={img} />
              </GridListTile>
            ))}
          </GridList>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Product
          </Button>
        </form>
      </div>
    </Container>
  );
}

function CategoriesOption({ categories }) {
  return (
    <>
      {categories.map((cat) => {
        return <CategoryOption category={cat} key={cat.id} />;
      })}
    </>
  );
}

function CategoryOption({ category }) {
  return (
    <>
      <option value={category.id} label={category.title} />
      <CategoriesOption categories={category.childrens} />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},
}));
