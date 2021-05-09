import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  makeStyles,
  Button,
  IconButton,
  Typography,
} from "@material-ui/core";

import { Cancel } from "@material-ui/icons";

import TextInput from "../../../common/input";

import { setProduct } from "../../../../store/actions/product";
import EditCardLayout from "../../../common/edit-card-layout";

const ProductSpecsForm = ({ header }) => {
  const classes = useStyles();

  const product = useSelector((state) => state.product.product);

  const dispatch = useDispatch();

  const handleSpecChange = (e) => {
    const [index, name] = e.target.name.split("_");

    dispatch(
      setProduct({
        ...product,
        specs: product.specs.map((spec, i) => {
          if (+index === +i) {
            return { ...spec, [name]: e.target.value };
          }
          return spec;
        }),
      })
    );
  };

  const addSpec = () => {
    dispatch(
      setProduct({
        ...product,
        specs: [...product.specs, { name: "", value: "" }],
      })
    );
  };

  const removeSpec = (index) => {
    dispatch(
      setProduct({
        ...product,
        specs: product.specs.filter((spec, i) => index !== i),
      })
    );
  };

  return (
    <EditCardLayout header={header}>
      <Grid container spacing={1}>
        {product.specs && product.specs.length > 0 ? (
          product.specs.map((spec, i) => (
            <Grid item container xs={12} spacing={1} key={`${i}_spec`}>
              <TextInput
                id={"spec_name" + i}
                label="Name"
                name={`${i}_name`}
                value={spec.name}
                handleChange={handleSpecChange}
                margin="dense"
                sm={5}
              />
              <TextInput
                id={"spec_value" + i}
                label="Value"
                name={`${i}_value`}
                value={spec.value}
                handleChange={handleSpecChange}
                margin="dense"
                sm={6}
              />
              <Grid item sm={1}>
                <IconButton
                  className={classes.remove}
                  onClick={() => removeSpec(i)}
                >
                  <Cancel color="error" />
                </IconButton>
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography>No specifications added !</Typography>
        )}
      </Grid>
      <Button variant="text" fullWidth color="primary" onClick={addSpec}>
        Add Specification
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
}));

export default ProductSpecsForm;
