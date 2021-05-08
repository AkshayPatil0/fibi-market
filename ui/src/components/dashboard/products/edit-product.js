import React, { useEffect } from "react";

import { Container, Grid, makeStyles } from "@material-ui/core";

import { useEditProductHook } from "./edit-product-hook";

import EditProductToolbar from "./edit-product-toolbar";
import ProductDetailsForm from "./forms/product-details-form";
import ProductSpecsForm from "./forms/product-specs-form";
import ProductVariantsForm from "./forms/product-variants-form";
import MultipleImagePicker from "../../common/multiple-image-picker";

export default function EditProduct() {
  const classes = useStyles();

  const {
    product,
    addProductImage,
    removeProductImage,
    rootRef,
  } = useEditProductHook();

  return (
    <div className={classes.root} ref={rootRef}>
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={12}>
            <EditProductToolbar />
          </Grid>
          <Grid container item md={6} xs={12} spacing={2}>
            <Grid item xs={12}>
              <ProductDetailsForm header="Product details" />
            </Grid>
            <Grid item xs={12}>
              <ProductSpecsForm header="Product specifications" />
            </Grid>
          </Grid>
          <Grid container item md={6} xs={12} spacing={2}>
            <Grid item xs={12}>
              <MultipleImagePicker
                previews={product.images}
                onAdd={addProductImage}
                onRemove={removeProductImage}
              />
            </Grid>
            <Grid item xs={12}>
              <ProductVariantsForm header="Product Variants" />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  delete: {
    position: "absolute",
    right: theme.spacing(0.2),
    top: theme.spacing(0.2),
    backgroundColor: "#fff",
    padding: 0,
  },
}));
