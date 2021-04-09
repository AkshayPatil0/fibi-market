import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import QueryString from "qs";
import { Box, Typography, makeStyles, Chip } from "@material-ui/core";

const AppliedFilters = () => {
  const classes = useStyles();
  const [query, setQuery] = useState({});

  const location = useLocation();
  const router = useHistory();

  useEffect(() => {
    const queryParams = QueryString.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    setQuery({ ...queryParams });
  }, [location]);

  const onDelete = (names) => {
    let newQuery = query;
    names.forEach((name) => {
      delete newQuery[name];
      //  = undefined;
    });

    console.log({ newQuery });
    router.push(`/products/?${QueryString.stringify(newQuery)}`);
  };

  return (
    <Box p={2} className={classes.root}>
      <Typography variant="h6" gutterBottom>
        <b>Applied filters</b>
      </Typography>
      <Box pb={2}>
        {(query.minPrice || query.maxPrice) && (
          <Chip
            label={`₹ ${query.minPrice} - ₹ ${query.maxPrice}`}
            onDelete={() => onDelete(["minPrice", "maxPrice"])}
            size="small"
            variant="outlined"
          />
        )}
        {Object.keys(query).length < 2 && (
          <Typography>No filters applied !</Typography>
        )}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
}));
export default AppliedFilters;
