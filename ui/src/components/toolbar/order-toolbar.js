import React, { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

import ToolbarLayout from "./toolbar-layout";

const ProductToolbar = () => {
  const classes = useStyles();

  return <ToolbarLayout></ToolbarLayout>;
};

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default ProductToolbar;
