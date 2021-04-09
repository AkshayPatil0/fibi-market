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
import AppliedFilters from "./applied-filters";

const FilterBar = () => {
  const classes = useStyles();
  const location = useLocation();
  const router = useHistory();
  // const user = useSelector((state) => state.auth.currentUser);
  // const items = useMenuItems(user);
  const [openMobile, setOpenMobile] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [filterQuery, setFilterQuery] = useState({});

  useEffect(() => {
    const getCategory = async (id) => {
      const res = await fetchCategory(id);
      setSelectedCategory(res.data);
    };
    const query = QueryString.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    if (query.category) {
      getCategory(query.category);
    }
    setFilterQuery({ ...filterQuery, ...query });
  }, [location]);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const onMobileClose = () => {
    setOpenMobile(false);
  };
  console.log({ filterQuery });
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
          <CardContent></CardContent>
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

          <AppliedFilters filter={filterQuery} setFilter={setFilterQuery} />
          <Divider />
          {selectedCategory && (
            <Box>
              <PriceFilter
                category={selectedCategory}
                filter={filterQuery}
                setFilter={setFilterQuery}
              />
              <Divider />
            </Box>
          )}
          <CardActions>
            <Button
              variant="text"
              color="primary"
              fullWidth
              onClick={() =>
                router.push(`/products/?${QueryString.stringify(filterQuery)}`)
              }
            >
              Apply filters
            </Button>
          </CardActions>
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

FilterBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

FilterBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default FilterBar;
