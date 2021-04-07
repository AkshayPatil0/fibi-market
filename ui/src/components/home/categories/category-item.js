import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  ListItem,
  ListItemText,
  Collapse,
  Typography,
  Box,
  Popover,
  makeStyles,
  Card,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, Delete } from "@material-ui/icons";

import { deleteCategory } from "../../../store/actions/product";
import CategoryList from "./category-list";

function CategoryItem({ category }) {
  const [showChildren, setShowChildren] = useState(false);

  const dispatch = useDispatch();
  return (
    <>
      <ListItem button onClick={() => setShowChildren(!showChildren)}>
        {showChildren ? <ExpandLess /> : <ExpandMore />}
        <ListItemText
          primary={<Typography variant="h6">{category.title}</Typography>}
        ></ListItemText>
      </ListItem>
      <Collapse in={showChildren} timeout="auto" unmountOnExit>
        <CategoryList categories={category.childrens} parent={category} />
      </Collapse>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

export default CategoryItem;
