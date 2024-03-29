import React, { useState } from "react";

import {
  Typography,
  Box,
  makeStyles,
  Card,
  IconButton,
} from "@material-ui/core";

import { CheckCircle } from "@material-ui/icons";

import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../../store/actions/product";

const VariantsList = ({ variants }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);

  const [selectedIndex, setSelectedIndex] = useState(null);

  const selectVariant = (i) => {
    dispatch(setProduct({ ...product, selectedVariant: variants[i] }));
    setSelectedIndex(i);
  };

  return (
    <Box display="flex" alignItems="flex-start">
      {variants &&
        variants.map((variant, i) => (
          <Card
            className={classes.variant}
            onClick={() => selectVariant(i)}
            key={i}
          >
            <Box className={classes.options}>
              {variant.variation &&
                Object.entries(variant.variation).map(([name, opt]) => (
                  <Typography key={name}>
                    {name} : {opt}
                  </Typography>
                ))}
            </Box>
            {selectedIndex === i && (
              <IconButton size="small" className={classes.checked}>
                <CheckCircle color="inherit" />
              </IconButton>
            )}
          </Card>
        ))}
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  variant: {
    cursor: "pointer",
    margin: theme.spacing(1),
    position: "relative",
    overflow: "visible",
  },
  checked: {
    color: theme.palette.success,
    position: "absolute",
    top: "-0.8rem",
    right: "-0.8rem",
  },
  options: {
    padding: theme.spacing(1),
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default VariantsList;
