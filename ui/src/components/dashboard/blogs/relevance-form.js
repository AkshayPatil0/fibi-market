import React, { useEffect, useState } from "react";
import {
  Grid,
  makeStyles,
  Box,
  Typography,
  capitalize,
} from "@material-ui/core";

import Select from "../../common/select";
import AsyncSelect from "../../common/select/async-select";
import { loadProducts } from "../../common/select/loaders";
import { getCategoryOptions } from "../../common/select/options";
import { useSelector } from "react-redux";

import * as api from "../../../api";

export default function RelevanceForm({ type, ids, setIds }) {
  const classes = useStyles();

  const categories = useSelector((state) => state.product.categories);
  const locations = useSelector((state) => state.product.locations);

  const handleChange = (e) => {
    setIds(e.target.value);
  };

  const [defaultOptions, setDefaultOptions] = useState();
  useEffect(() => {
    const getDefaultProducts = async () => {
      const options = await Promise.all(
        ids.map(async (id) => {
          const res = await api.fetchProduct(id);
          return { label: res.data.title, value: res.data.id };
        })
      );
      setDefaultOptions(options);
    };
    const getDefaultCategories = async () => {
      const options = getCategoryOptions(categories).filter((opt) =>
        ids.includes(opt.value)
      );

      setDefaultOptions(options);
    };
    if (type === "products") getDefaultProducts();
    if (type === "categories") getDefaultCategories();
  }, [ids, categories, type]);

  const getRelevanceSelect = () => {
    switch (type) {
      case "products":
        return (
          <AsyncSelect
            loadOptions={loadProducts}
            placeholder="Select products"
            value={defaultOptions}
            handleChange={handleChange}
            multiple
          />
        );
      case "categories":
        return (
          <Select
            placeholder={`Select categories`}
            options={getCategoryOptions(categories)}
            value={defaultOptions}
            handleChange={handleChange}
            multiple
          />
        );
      case "locations":
        return (
          <Select
            placeholder={`Select locations`}
            options={getCategoryOptions(locations)}
            value={defaultOptions}
            handleChange={handleChange}
            multiple
          />
        );
      default:
        return <Select disabled />;
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Box className={classes.root}>
          <Box>
            <Typography variant="h6">{capitalize(type)} :</Typography>
          </Box>
          <Box flex={1}>{getRelevanceSelect()}</Box>
        </Box>
      </Grid>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    gridGap: "0.5rem",
  },
}));
