import React, { useState } from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../../../store/actions/product";
import Input from "../../../common/input";
import ProductVariationForm from "./product-variation-form";

const ProductVariationsForm = () => {
  const classes = useStyles();

  const product = useSelector((state) => state.product.product);

  const dispatch = useDispatch();
  const [newVariation, setNewVariation] = useState("");

  const addVariation = async (e) => {
    e.preventDefault();
    dispatch(
      setProduct({
        ...product,
        variations: { ...product.variations, [newVariation]: [] },
      })
    );
    setNewVariation("");
  };

  const removeVariation = (name) => {
    let newVariations = product.variations;
    newVariations[name] = undefined;
    newVariations = JSON.parse(JSON.stringify(newVariations));
    dispatch(
      setProduct({
        ...product,
        variations: newVariations,
      })
    );
  };

  const setVariation = async (key, value) => {
    dispatch(
      setProduct({
        ...product,
        variations: {
          ...product.variations,
          [key]: [...product.variations[key], value],
        },
      })
    );
  };

  return (
    <Grid item container xs={12} className={classes.root}>
      {product.variations && Object.keys(product.variations).length > 0 ? (
        Object.entries(product.variations).map(([name, variation]) => {
          return (
            <Grid item xs={12} sm={6} key={name}>
              <ProductVariationForm
                setVariation={setVariation}
                name={name}
                variation={variation}
                removeVariation={() => removeVariation(name)}
              />
            </Grid>
          );
        })
      ) : (
        <Grid item xs={12}>
          <Typography>No variations specified !</Typography>
        </Grid>
      )}

      <Grid item xs={12}>
        <form onSubmit={addVariation}>
          <Input
            name="title"
            type="text"
            placeholder="Add new variation.."
            value={newVariation}
            handleChange={(e) => setNewVariation(e.target.value)}
            margin="dense"
            size="small"
          />
        </form>
      </Grid>
    </Grid>
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

export default ProductVariationsForm;
