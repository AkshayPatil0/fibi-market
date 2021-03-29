import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, Delete } from "@material-ui/icons";

import TextInput from "../common/input";
import {
  addCategory,
  getCategories,
  deleteCategory,
} from "../../store/actions/product";
import { useHistory } from "react-router";
import qs from "qs";
import { Link } from "react-router-dom";

const homePage = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const categories = useSelector((state) => state.product.categories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div>
      <Typography variant="button">Hello {user?.firstName}</Typography>
    </div>
  );
};

export default homePage;
