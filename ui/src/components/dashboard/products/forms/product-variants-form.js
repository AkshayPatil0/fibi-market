import React, { useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Divider,
  makeStyles,
  Button,
  Typography,
  Box,
} from "@material-ui/core";

import { getProductState } from "../../../../utils";
import { useDispatch } from "react-redux";
import { setProduct } from "../../../../store/actions/product";
import ProductVariantForm from "./product-variant-form";
import EditCardLayout from "../../../common/edit-card-layout";
import ProductVariationsForm from "./product-variations-form";

const ProductVariantsForm = ({ header }) => {
  const classes = useStyles();
  const product = getProductState();

  const initialVariation = {};

  useEffect(() => {
    product?.variations &&
      Object.keys(product.variations).map((k) => {
        initialVariant[k] = "";
      });
  }, [product.variations]);

  const initialVariant = {
    variation: initialVariation,
    sku: "",
    price: { mrp: "", retail: "" },
    stock: "",
  };

  const dispatch = useDispatch();

  const addVariant = async () => {
    dispatch(
      setProduct({
        ...product,
        variants: [...product.variants, initialVariant],
      })
    );
  };

  const removeVariant = async (index) => {
    dispatch(
      setProduct({
        ...product,
        variants: product.variants.filter((v, i) => i !== index),
      })
    );
  };

  const setVariant = async (index, name, value) => {
    dispatch(
      setProduct({
        ...product,
        variants: product.variants.map((variant, i) => {
          if (i === index) return { ...variant, [name]: value };
          return variant;
        }),
      })
    );
  };

  return (
    <EditCardLayout header={header}>
      <Grid container spacing={1}>
        <Box>
          <Typography variant="h6">Variations</Typography>
        </Box>
        <ProductVariationsForm />
        <Box pt={2}>
          <Typography variant="h6">Variants</Typography>
        </Box>
        {product.variants && product.variants.length > 0 ? (
          product.variants.map((variant, i) => (
            <Grid item key={`${i}_variant`}>
              <Card className={classes.variantCard}>
                <Divider />
                <CardContent>
                  <ProductVariantForm
                    variant={variant}
                    onRemove={() => removeVariant(i)}
                    setVariant={(name, value) => setVariant(i, name, value)}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography>No variants present !</Typography>
          </Grid>
        )}
      </Grid>
      <Button variant="text" fullWidth color="primary" onClick={addVariant}>
        Add Variant
      </Button>
    </EditCardLayout>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  remove: {
    padding: 0,
    height: "100%",
  },
  variantCard: {
    position: "relative",
    overflow: "visible",
  },
}));

export default ProductVariantsForm;
