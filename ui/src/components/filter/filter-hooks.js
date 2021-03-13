import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import AsyncSelect from "../select/async-select";
import Select from "../select";
import { getCategoryOptions } from "../select/options";
import { loadVendors } from "../select/loaders";
import { setProductFilter, resetFilter } from "../../store/actions/filter";
import { getProducts } from "../../store/actions/product";
import {
  getCategoriesState,
  getCurrentUserState,
  getProductFilterState,
  isAdmin,
} from "../../utils";

export const useProductFilter = () => {
  const categories = getCategoriesState();
  const user = getCurrentUserState();
  const filter = getProductFilterState();

  const dispatch = useDispatch();

  const [filterOptions, setFilterOptions] = useState([]);
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

  useEffect(() => {
    if (isAdmin(user)) setFilterOptions(adminOptions);
    else setFilterOptions(vendorOptions);
  }, [user]);

  return {
    filterOptions,
    applyFilters,
    clearFilters,
  };
};
