import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";

import FilterLayout from "./filter-layout";
import Select from "../../common/select";
import { userRoleOptions } from "../../common/select/options";
import { setUserFilter, resetFilter } from "../../../store/actions/filter";
import { getUsers } from "../../../store/actions/user";
import {
  getCurrentUserState,
  getUserFilterState,
  isAdmin,
} from "../../../utils";

const UserFilter = () => {
  const user = getCurrentUserState();
  const filter = getUserFilterState();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setUserFilter(e.target.name, e.target.value));
  };

  const applyFilters = (e) => {
    e.preventDefault();
    dispatch(getUsers(filter));
  };

  const clearFilters = () => {
    dispatch(resetFilter("user"));
  };
  const selectRole = (
    <Select
      options={userRoleOptions}
      placeholder="Role"
      name="role"
      value={filter.role}
      handleChange={handleChange}
    />
  );

  const adminOptions = [selectRole];
  const vendorOptions = [];

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

export default UserFilter;
