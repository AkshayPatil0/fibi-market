import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import QueryString from "qs";
import { Box, Typography, makeStyles, Chip, Button } from "@material-ui/core";

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
      const [path, subpath] = name.split(".");
      if (subpath) {
        newQuery = {
          ...query,
          [path]: query[path].filter((val, i) => i !== +subpath),
        };
      } else {
        delete newQuery[name];
      }
    });
    router.push(`?${QueryString.stringify(newQuery)}`);
  };

  const onClearFilters = () => {
    router.push("?");
  };

  return (
    <Box p={2} className={classes.root}>
      <Typography variant="h6" gutterBottom>
        <b>Applied filters</b>
      </Typography>
      <Box px={2}>
        {query.search && (
          <Chip
            className={classes.chip}
            size="small"
            variant="outlined"
            onDelete={() => onDelete(["search"])}
            label={`search: ${query.search}`}
          />
        )}
        {(query.minPrice || query.maxPrice) && (
          <Chip
            label={`₹ ${query.minPrice} - ₹ ${query.maxPrice}`}
            onDelete={() => onDelete(["minPrice", "maxPrice"])}
            size="small"
            variant="outlined"
            className={classes.chip}
          />
        )}
        {query.subcategories &&
          query.subcategories.map((cat, i) => (
            <Chip
              label={cat}
              onDelete={() => onDelete([`subcategories.${i}`])}
              size="small"
              variant="outlined"
              className={classes.chip}
            />
          ))}
        {query.locations &&
          query.locations.map((cat, i) => (
            <Chip
              label={cat}
              onDelete={() => onDelete([`locations.${i}`])}
              size="small"
              variant="outlined"
              className={classes.chip}
            />
          ))}

        {Object.keys(query).length > 1 ||
        (Object.keys(query).length === 1 && query.sort === undefined) ? (
          <Box className={classes.clearFilter}>
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              onClick={onClearFilters}
            >
              clear filters
            </Button>
          </Box>
        ) : (
          <Typography>No filters applied !</Typography>
        )}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  chip: {
    margin: "2px",
  },
  clearFilter: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: theme.spacing(2),
    fontSize: "0.7rem",
  },
}));
export default AppliedFilters;
