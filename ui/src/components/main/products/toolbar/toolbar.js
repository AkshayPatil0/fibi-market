import {
  Box,
  Breadcrumbs,
  Grid,
  LinearProgress,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import QueryString from "qs";
import React from "react";
import { useLocation, useHistory } from "react-router";
import Select from "../../../common/select";

const sortOptions = [
  {
    label: "Price - low to high",
    value: JSON.stringify({ "price.retail": 1 }),
  },
  {
    label: "Price - high to low",
    value: JSON.stringify({ "price.retail": -1 }),
  },
];

export default function Toolbar({ category, isLoading }) {
  const classes = useStyles();

  const location = useLocation();
  const router = useHistory();

  const handleSort = (e) => {
    let query = QueryString.parse(location.search, { ignoreQueryPrefix: true });
    query.sort = JSON.parse(e.target.value);
    router.push(`?${QueryString.stringify(query)}`);
  };
  const handleClick = (e) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <Grid item xs={12}>
      <Box className={classes.content}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/" onClick={handleClick}>
            Home
          </Link>
          <Typography color="textPrimary">
            {category ? category.title : "Search results"}
          </Typography>
        </Breadcrumbs>
        <Box className={classes.sort}>
          <Select
            options={sortOptions}
            placeholder="Sort by.."
            handleChange={handleSort}
            disableSearch
          />
        </Box>
      </Box>
      {isLoading && (
        <Box width="100%" pt={0.5}>
          <LinearProgress />
        </Box>
      )}
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "visible",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  sort: {
    width: "50%",
    maxWidth: 256,
  },
}));
