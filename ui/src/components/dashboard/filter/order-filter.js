import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";

import FilterLayout from "./filter-layout";
import AsyncSelect from "../../common/select/async-select";
import Select from "../../common/select";
import { orderStatusOptions } from "../../common/select/options";
import { loadVendors, loadUsers } from "../../common/select/loaders";
import { setOrderFilter, resetFilter } from "../../../store/actions/filter";
import { getOrders } from "../../../store/actions/order";
import {
  getCurrentUserState,
  getOrderFilterState,
  isAdmin,
} from "../../../utils";

const OrderFilter = () => {
  const user = getCurrentUserState();
  const filter = getOrderFilterState();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setOrderFilter(e.target.name, e.target.value));
  };

  const applyFilters = (e) => {
    e.preventDefault();
    dispatch(getOrders(filter));
  };

  const clearFilters = () => {
    dispatch(resetFilter("order"));
    dispatch(getOrders());
  };

  const selectOrderStatus = (
    <Select
      options={orderStatusOptions}
      placeholder="Status"
      name="status"
      value={filter.status}
      handleChange={handleChange}
    />
  );

  const selectVendors = (
    <AsyncSelect
      loadOptions={loadVendors}
      placeholder="Vendor"
      name="vendor"
      value={filter.vendor}
      handleChange={handleChange}
    />
  );

  const selectUsers = (
    <AsyncSelect
      loadOptions={loadUsers}
      placeholder="User"
      name="userId"
      value={filter.userId}
      handleChange={handleChange}
    />
  );

  const adminOptions = [selectOrderStatus, selectVendors, selectUsers];
  const vendorOptions = [selectOrderStatus, selectUsers];

  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    if (isAdmin(user)) setFilterOptions(adminOptions);
    else setFilterOptions(vendorOptions);
  }, [user]);

  return (
    <FilterLayout applyFilters={applyFilters} clearFilters={clearFilters}>
      {filterOptions.map((opt, i) => (
        <Grid item xs={12} sm key={i}>
          {opt}
        </Grid>
      ))}
    </FilterLayout>
  );
};

export default OrderFilter;
