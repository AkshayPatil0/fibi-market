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
      <Categories categories={categories} />
    </div>
  );
};

export default homePage;

function Categories({ categories, parent }) {
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(addCategory({ title: category, parent }));
  };
  return (
    <List component="nav" style={{ paddingLeft: "20px" }}>
      {categories.map((cat) => {
        return <Category key={cat.id} category={cat} />;
      })}
      <ListItem>
        <form onSubmit={onSubmit}>
          <TextInput
            type="text"
            name="category"
            label="Add category"
            handleChange={(e) => setCategory(e.target.value)}
          />
        </form>
      </ListItem>
    </List>
  );
}

function Category({ category }) {
  const [open, setOpen] = useState(false);

  const router = useHistory();
  const dispatch = useDispatch();
  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemText
          primary={category.title}
          // onClick={() => router.push(`/products?category=${category.id}`)}
        ></ListItemText>
        <Link to={`/products?category=${category.id}`}>products</Link>
        <Delete
          color="error"
          onClick={() => dispatch(deleteCategory(category.id))}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Categories categories={category.childrens} parent={category.id} />
      </Collapse>
    </>
  );
}
