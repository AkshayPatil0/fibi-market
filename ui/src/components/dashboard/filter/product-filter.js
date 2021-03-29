import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";

import FilterLayout from "./filter-layout";

import { useDispatch } from "react-redux";
import AsyncSelect from "../../common/select/async-select";
import Select from "../../common/select";
import { getCategoryOptions } from "../../common/select/options";
import { loadVendors } from "../../common/select/loaders";
import { setProductFilter, resetFilter } from "../../../store/actions/filter";
import { getProducts } from "../../../store/actions/product";
import {
  getCategoriesState,
  getCurrentUserState,
  getProductFilterState,
  isAdmin,
} from "../../../utils";

const ProductFilter = () => {
  const categories = getCategoriesState();
  const user = getCurrentUserState();
  const filter = getProductFilterState();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setProductFilter(e.target.name, e.target.value));
  };
  const applyFilters = (e) => {
    e.preventDefault();
    dispatch(getProducts(filter));
  };

  const clearFilters = () => {
    dispatch(resetFilter("product"));
    dispatch(getProducts());
  };

  const selectCategory = (
    <Select
      options={getCategoryOptions(categories)}
      placeholder="Category"
      name="category"
      value={filter.category}
      handleChange={handleChange}
    />
  );

  const selectVendor = (
    <AsyncSelect
      loadOptions={loadVendors}
      placeholder="Vendor"
      name="vendor"
      value={filter.vendor}
      handleChange={handleChange}
    />
  );

  const adminOptions = [selectCategory, selectVendor];

  const vendorOptions = [selectCategory];

  const [filterOptions, setFilterOptions] = useState([]);
  useEffect(() => {
    if (isAdmin(user)) setFilterOptions(adminOptions);
    else setFilterOptions(vendorOptions);
  }, [user]);

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
