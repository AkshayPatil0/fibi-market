import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import QueryString from "qs";
import clsx from "clsx";
import {
  Box,
  makeStyles,
  Button,
  Grid,
  Modal,
  Card,
  CardHeader,
  IconButton,
  Divider,
  CardActions,
} from "@material-ui/core";

import PriceFilter from "./price";
import LocationFilter from "./location";
import { Close } from "@material-ui/icons";
import { Filter } from "react-feather";

import AppliedFilters from "./applied-filters";
import Subcategories from "./subcategories";
import SelectCategory from "./select-category";

const FilterBar = ({ selectedCategory, selectedLocation }) => {
  const classes = useStyles();
  const location = useLocation();
  const router = useHistory();
  const [openMobile, setOpenMobile] = useState(false);

  const [filterQuery, setFilterQuery] = useState({});

  useEffect(() => {
    const query = QueryString.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    setFilterQuery(query);
  }, [location]);

  useEffect(() => {
    if (openMobile) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const onMobileClose = () => {
    setOpenMobile(false);
  };

  const filters = (
    <>
      <AppliedFilters />
      <Divider />
      {selectedCategory && (
        <Box>
          <PriceFilter
            selectedCategory={selectedCategory}
            filter={filterQuery}
            setFilter={setFilterQuery}
          />
          <Divider />
        </Box>
      )}
      {selectedCategory &&
        selectedCategory.childrens &&
        selectedCategory.childrens.length > 0 && (
          <Box className={classes.filterBox}>
            <Subcategories
              categories={selectedCategory.childrens}
              filter={filterQuery}
              setFilter={setFilterQuery}
            />
            <Divider />
          </Box>
        )}
      <Box>
        <LocationFilter filter={filterQuery} setFilter={setFilterQuery} />
        <Divider />
      </Box>
    </>
  );

  return (
    <>
      <Modal open={openMobile} onClose={onMobileClose}>
        <Card className={classes.mobileFilterCard}>
          <CardHeader
            title="Filter"
            action={
              <IconButton onClick={onMobileClose}>
                <Close />
              </IconButton>
            }
          />
          <Divider />
          {selectedCategory && (
            <>
              {filters}
              <Box display="flex" justifyContent="flex-end" px={2} py={1}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() =>
                    router.push(`?${QueryString.stringify(filterQuery)}`)
                  }
                >
                  Apply
                </Button>
              </Box>
            </>
          )}
        </Card>
      </Modal>
      <IconButton
        className={clsx(classes.filterButton, classes.sectionMobile)}
        onClick={() => setOpenMobile(true)}
      >
        <Filter className={classes.filterIcon} />
      </IconButton>
      <Grid item md={3} className={classes.sectionDesktop}>
        <Card>
          <CardHeader title="Filter" />
          <Divider />
          {selectedCategory ? (
            <>
              {filters}

              <CardActions>
                <Button
                  variant="text"
                  color="primary"
                  fullWidth
                  onClick={() =>
                    router.push(`?${QueryString.stringify(filterQuery)}`)
                  }
                >
                  Apply filters
                </Button>
              </CardActions>
            </>
          ) : (
            <SelectCategory />
          )}
        </Card>
      </Grid>
    </>
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

export default FilterBar;
