import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import AsyncSelect from "../select/async-select";
import { getOrders } from "../../store/actions/order";
import Select from "../select";
import { orderStatusOptions } from "../select/options";
import { loadUsers, loadVendors } from "../select/loaders";
import FilterLayout from "./filter-layout";
import { setOrderFilter, resetFilter } from "../../store/actions/filter";
import { isAdmin } from "../../utils";

const OrderFilter = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const filter = useSelector((state) => state.filter.order);

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

  return (
    <FilterLayout applyFilters={applyFilters} clearFilters={clearFilters}>
      <Grid item xs={12} sm>
        <Select
          options={orderStatusOptions}
          placeholder="Status"
          name="status"
          value={filter.status}
          handleChange={handleChange}
        />
      </Grid>
      {isAdmin(user) && (
        <Grid item xs={12} sm>
          <AsyncSelect
            loadOptions={loadVendors}
            placeholder="Vendor"
            name="vendor"
            value={filter.vendor}
            handleChange={handleChange}
          />
        </Grid>
      )}
      <Grid item xs={12} sm>
        <AsyncSelect
          loadOptions={loadUsers}
          placeholder="User"
          name="userId"
          value={filter.userId}
          handleChange={handleChange}
        />
      </Grid>
    </FilterLayout>
  );
};

export default OrderFilter;
