import { Box, Typography } from "@material-ui/core";
import QueryString from "qs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

export default function SelectLocation() {
  const location = useLocation();
  const router = useHistory();

  const locations = useSelector((state) => state.product.locations);
  const [filterQuery, setFilterQuery] = useState({});

  useEffect(() => {
    const query = QueryString.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    setFilterQuery((q) => ({ ...q, ...query }));
  }, [location]);

  const selectLocation = (id) => {
    router.push(`/${id}?${QueryString.stringify(filterQuery)}`);
  };
  return (
    <Box p={2}>
      <Typography variant="h6">
        <b>Select location</b>
      </Typography>
      <Box px={2} pt={0.5}>
        {locations.map((loc) => (
          <Typography onClick={() => selectLocation(loc.id)}>
            {loc.title}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
