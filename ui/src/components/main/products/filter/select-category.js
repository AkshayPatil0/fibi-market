import { Box, Typography } from "@material-ui/core";
import QueryString from "qs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { NavLink } from "react-router-dom";

export default function SelectCategory() {
  const location = useLocation();
  const router = useHistory();

  const categories = useSelector((state) => state.product.categories);
  const [filterQuery, setFilterQuery] = useState({});

  useEffect(() => {
    const query = QueryString.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    setFilterQuery((q) => ({ ...q, ...query }));
  }, [location]);

  const selectCategory = (id) => {
    router.push(`/categories/${id}?${QueryString.stringify(filterQuery)}`);
  };
  return (
    <Box p={2}>
      <Typography variant="h6">
        <b>Select category</b>
      </Typography>
      <Box px={2} pt={0.5} display="flex" flexDirection="column">
        {categories.map((cat) => (
          <Typography
            component={NavLink}
            to={`/categories/${cat.slug}?${QueryString.stringify(filterQuery)}`}
          >
            {cat.title}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
