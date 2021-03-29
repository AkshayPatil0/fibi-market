import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ListItem, ListItemText, Collapse } from "@material-ui/core";
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
        <ListItemText primary={category.title}></ListItemText>
        <Delete
          color="error"
          onClick={() => dispatch(deleteCategory(category.id))}
        />
      </ListItem>
      <Collapse in={showChildren} timeout="auto" unmountOnExit>
        <CategoryList categories={category.childrens} parent={category} />
      </Collapse>
    </>
  );
}

export default CategoryItem;
