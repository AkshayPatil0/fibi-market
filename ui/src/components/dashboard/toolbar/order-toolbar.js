import React from "react";
import { makeStyles } from "@material-ui/core";

import ToolbarLayout from "./toolbar-layout";

const OrderToolbar = () => {
  const classes = useStyles();

  return <ToolbarLayout></ToolbarLayout>;
};

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default OrderToolbar;
