import React, { useState } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  SvgIcon,
  Box,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Search as SearchIcon } from "react-feather";

import ToolbarLayout from "./toolbar-layout";

const ProductToolbar = () => {
  const classes = useStyles();

  return (
    <ToolbarLayout>
      <TextField
        margin="dense"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SvgIcon fontSize="small" color="action">
                <SearchIcon />
              </SvgIcon>
            </InputAdornment>
          ),
        }}
        placeholder="Search product"
        variant="outlined"
      />
      <Box flex="1" />
      <Box display="flex" alignItems="center">
        <Button
          color="primary"
          variant="contained"
          component={Link}
          to="products/new"
        >
          Add product
        </Button>
      </Box>
    </ToolbarLayout>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default ProductToolbar;
