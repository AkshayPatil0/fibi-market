import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

export default function LocationFilter({ filter, setFilter }) {
  const classes = useStyles();

  const locations = useSelector((state) => state.product.locations);

  const selectLocation = (id) => {
    if (!filter.locations) {
      setFilter({ ...filter, locations: [id] });
    } else {
      if (filter.locations.includes(id)) {
        setFilter({
          ...filter,
          locations: filter.locations.filter((catId) => catId !== id),
        });
      } else {
        setFilter({ ...filter, locations: [...filter.locations, id] });
      }
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h6">
        <b>Locations</b>
      </Typography>
      <Box className={classes.filterBox}>
        <FormControl component="fieldset">
          <FormGroup>
            <LocationList
              locations={locations}
              selectLocation={selectLocation}
              filter={filter}
            />
          </FormGroup>
        </FormControl>
      </Box>
    </Box>
  );
}

const LocationList = ({ locations, selectLocation, filter }) => {
  const classes = useStyles();
  return (
    <>
      {locations &&
        locations.map((location) => (
          <div key={location.id}>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label={location.title}
              checked={
                filter.locations
                  ? filter.locations.includes(location.slug)
                  : false
              }
              className={classes.formGroup}
              onChange={() => selectLocation(location.slug)}
            />
            <LocationList
              locations={location.childrens}
              selectLocation={selectLocation}
              filter={filter}
            />
          </div>
        ))}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  formGroup: {
    "& > *": {
      paddingTop: theme.spacing(0.3),
      paddingBottom: theme.spacing(0.3),
    },
  },
  filterBox: {
    padding: theme.spacing(0.5, 2, 0),
    maxHeight: "256px",
    overflowY: "auto",
  },
}));
