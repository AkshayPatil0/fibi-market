import React from "react";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/actions/user";
import { resetFilter, setUserFilter } from "../../store/actions/filter";
import FilterLayout from "./filter-layout";
import Select from "../select";
import { userRoleOptions } from "../select/options";

const UserFilter = () => {
  const filter = useSelector((state) => state.filter.user);
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
  return (
    <FilterLayout applyFilters={applyFilters} clearFilters={clearFilters}>
      <Grid item xs={12} sm>
        <Select
          options={userRoleOptions}
          placeholder="Role"
          name="role"
          value={filter.role}
          handleChange={handleChange}
        />
      </Grid>
    </FilterLayout>
  );
};

export default UserFilter;
