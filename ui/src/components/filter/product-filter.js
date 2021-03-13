import React from "react";
import { Grid } from "@material-ui/core";

import FilterLayout from "./filter-layout";

import { useProductFilter } from "./filter-hooks";
const ProductFilter = () => {
  const { filterOptions, applyFilters, clearFilters } = useProductFilter();

  return (
    <FilterLayout applyFilters={applyFilters} clearFilters={clearFilters}>
      {filterOptions.map((opt, i) => {
        return (
          <Grid item xs={12} sm key={i}>
            {opt}
          </Grid>
        );
      })}
    </FilterLayout>
  );
};

export default ProductFilter;
