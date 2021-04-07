import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

import TextInput from "../../../common/input";

import {
  getCategoriesState,
  getLocationsState,
  getProductState,
} from "../../../../utils";
import { useDispatch } from "react-redux";
import { setProduct } from "../../../../store/actions/product";
import Select from "../../../common/select";
import { getCategoryOptions } from "../../../common/select/options";
import EditCardLayout from "../../../common/edit-card-layout";

const ProductDetailsForm = ({ header, action }) => {
  const classes = useStyles();

  const product = getProductState();
  const categories = getCategoriesState();
  const locations = getLocationsState();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const [path, subpath] = e.target.name.split(".");
    console.log({ path, subpath });
    if (subpath) {
      dispatch(
        setProduct({
          ...product,
          [path]: { ...product[path], [subpath]: e.target.value },
        })
      );
    } else {
      dispatch(setProduct({ ...product, [path]: e.target.value }));
    }
  };

  return (
    <EditCardLayout header={header}>
      <Grid container spacing={1}>
        <TextInput
          label="Title"
          name="title"
          value={product.title}
          handleChange={handleChange}
          autoFocus
          margin="dense"
          required
        />
        <TextInput
          label="Product SKU"
          name="sku"
          value={product.sku}
          handleChange={handleChange}
          margin="dense"
          required
        />
        <TextInput
          label="Description"
          name="description"
          value={product.description}
          handleChange={handleChange}
          margin="dense"
          multiline
        />
        <TextInput
          label="MRP"
          name="price.mrp"
          type="number"
          value={product.price.mrp}
          handleChange={handleChange}
          margin="dense"
          sm={6}
          required
        />
        <TextInput
          label="Retail price"
          name="price.retail"
          type="number"
          value={product.price.retail}
          handleChange={handleChange}
          margin="dense"
          sm={6}
          required
        />
        <TextInput
          label="Stock"
          name="stock"
          type="number"
          value={product.stock}
          handleChange={handleChange}
          margin="dense"
          required
        />
        <Grid item xs={12}>
          <Select
            name="category"
            placeholder="Select category "
            value={product.category}
            options={getCategoryOptions(categories)}
            handleChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            name="location"
            placeholder="Select location "
            value={product.location}
            options={getCategoryOptions(locations)}
            handleChange={handleChange}
          />
        </Grid>
      </Grid>
      <>{action}</>
    </EditCardLayout>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default ProductDetailsForm;
