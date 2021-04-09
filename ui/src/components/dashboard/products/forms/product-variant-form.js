import React from "react";
import { Grid, makeStyles, IconButton } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";

import TextInput from "../../../common/input";
import Select from "../../../common/select";

import { useSelector } from "react-redux";

const ProductVariantForm = ({ variant, onRemove, setVariant }) => {
  const classes = useStyles();

  const product = useSelector((state) => state.product.product);

  /* 
  product.variants : [
   {
     variations: {color: "Red", size: "M"}
     sku: MTSR01-M
     price: {mrp: 399, retail: 299}
     stock: 10,
   }
  ]
  */
  const handleChange = (e) => {
    const [path, subpath] = e.target.name.split(".");
    if (subpath) {
      setVariant(path, {
        ...variant[path],
        [subpath]: e.target.value,
      });
    } else {
      setVariant(path, e.target.value);
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item container spacing={1}>
        {/* 
        product.variations : {
          color: ["red", "blue"], 
          size: ["S", "M", "L"]
          } 
        */}
        {product?.variations &&
          Object.entries(product.variations).map(([name, options]) => {
            return (
              <Grid item xs={6} key={name}>
                <Select
                  placeholder={name}
                  options={options.map((opt) => ({ label: opt, value: opt }))}
                  value={variant.variation[name]}
                  name={"variation." + name}
                  handleChange={handleChange}
                />
              </Grid>
            );
          })}
      </Grid>
      <TextInput
        label="Product SKU"
        name="sku"
        value={variant?.sku}
        handleChange={handleChange}
        margin="dense"
        type="text"
        required
      />
      <TextInput
        label="MRP"
        name="price.mrp"
        value={variant?.price.mrp}
        handleChange={handleChange}
        margin="dense"
        sm={6}
        required
      />
      <TextInput
        label="Retail price"
        name="price.retail"
        value={variant?.price.retail}
        handleChange={handleChange}
        margin="dense"
        sm={6}
        required
      />
      <TextInput
        label="Stock"
        name="stock"
        value={variant?.stock}
        handleChange={handleChange}
        margin="dense"
        type="number"
        required
      />

      <Grid item xs={12}></Grid>
      <IconButton className={classes.remove} onClick={onRemove}>
        <Cancel color="error" />
      </IconButton>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  remove: {
    padding: 0,
    position: "absolute",
    top: "-0.5rem",
    right: "-0.5rem",
  },
}));

export default ProductVariantForm;
