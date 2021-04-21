import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

const Subcategories = ({ categories, filter, setFilter }) => {
  const classes = useStyles();

  const selectCategory = (id) => {
    if (!filter.subcategories) {
      setFilter({ ...filter, subcategories: [id] });
    } else {
      console.log(id, filter.subcategories, id in filter.subcategories);
      if (filter.subcategories.includes(id)) {
        setFilter({
          ...filter,
          subcategories: filter.subcategories.filter((catId) => catId !== id),
        });
      } else {
        setFilter({ ...filter, subcategories: [...filter.subcategories, id] });
      }
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h6">
        <b>Categories</b>
      </Typography>
      <Box className={classes.filterBox}>
        <FormControl component="fieldset">
          <FormGroup>
            <CategoryList
              categories={categories}
              selectCategory={selectCategory}
              filter={filter}
            />
          </FormGroup>
        </FormControl>
      </Box>
    </Box>
  );
};

const CategoryList = ({ categories, selectCategory, filter }) => {
  const classes = useStyles();
  return (
    <>
      {categories &&
        categories.map((category) => (
          <div key={category.id}>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label={category.title}
              checked={
                filter.subcategories
                  ? filter.subcategories.includes(category.slug)
                  : false
              }
              className={classes.formGroup}
              onChange={() => selectCategory(category.slug)}
            />
            <CategoryList
              categories={category.childrens}
              selectCategory={selectCategory}
              filter={filter}
            />
          </div>
        ))}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  formGroup: {
    "& > *": {
      paddingTop: theme.spacing(0.3),
      paddingBottom: theme.spacing(0.3),
    },
  },
  filterBox: {
    padding: theme.spacing(0.5, 2, 0),
    maxHeight: "256px",
    overflowY: "auto",
  },
}));

export default Subcategories;
