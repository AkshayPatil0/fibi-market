import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { List, ListItem, ListItemText } from "@material-ui/core";

import TextInput from "../../common/input";
import { addCategory } from "../../../store/actions/product";
import CategoryItem from "./category-item";

function CategoryList({ categories, parent }) {
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();

    await dispatch(addCategory({ title: category, parent: parent?.id }));
    setCategory("");
  };

  return (
    <List component="nav" style={{ paddingLeft: "20px" }}>
      {categories.map((cat) => {
        return <CategoryItem key={cat.id} category={cat} />;
      })}
    </List>
  );
}

export default CategoryList;
