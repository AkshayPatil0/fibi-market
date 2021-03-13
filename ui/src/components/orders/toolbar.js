import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Box, Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

// import OrderFilter from './order-filter';
import OrderFilter from "../filter/order-filter";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Toolbar = ({ className, vendor, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <OrderFilter />
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
};

export default Toolbar;
