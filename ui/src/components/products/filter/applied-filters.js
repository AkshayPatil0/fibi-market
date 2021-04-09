import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import QueryString from "qs";
import clsx from "clsx";
import {
  Box,
  Drawer,
  Hidden,
  Typography,
  makeStyles,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
  Modal,
  Card,
  CardHeader,
  IconButton,
  Divider,
  CardContent,
  Chip,
  CardActions,
} from "@material-ui/core";

import EditCardLayout from "../../common/edit-card-layout";
import PriceFilter from "./price";
import { Close } from "@material-ui/icons";
import { Filter } from "react-feather";

import { fetchCategory } from "../../../api";

const AppliedFilters = () => {
  const classes = useStyles();
  const [filter, setFilter] = useState({});

  const location = useLocation();

  useEffect(() => {
    const query = QueryString.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    setFilter({ ...query });
  }, [location]);
  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        <b>Applied filters</b>
      </Typography>
      <Box pb={2}>
        {(filter.minPrice || filter.maxPrice) && (
          <Chip
            label={`₹ ${filter.minPrice} - ₹ ${filter.maxPrice}`}
            onDelete={() => {}}
            size="small"
            variant="outlined"
          />
        )}
        {/* {Object.keys(filterQuery).map((query) => {
                  console.log(query, filterQuery[query]);
                  return <Chip label={`${query}-${filterQuery[query]}`} />;
                })} */}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  mobileFilterCard: {
    margin: "10px",
    outline: 0,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "unset",
    },
  },
  sectionMobile: {
    display: "unset",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  filterButton: {
    position: "fixed",
    bottom: "10px",
    right: "10px",
    // backgroundColor: theme.palette.primary.main,
  },
  filterIcon: {
    color: theme.palette.secondary.main,
    fill: theme.palette.secondary.main,
  },
}));
export default AppliedFilters;
