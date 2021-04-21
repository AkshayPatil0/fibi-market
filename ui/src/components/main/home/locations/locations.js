import React from "react";

import { Box, makeStyles, Grid } from "@material-ui/core";

import LocationCard from "./location-card";

export default function Locations({ locations }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {locations &&
        locations.map((location, i) => (
          <Grid item xs={12} lg={6} key={i}>
            <Box p={2} height="100%">
              <LocationCard location={location} alt={!!(i % 2)} />
            </Box>
          </Grid>
        ))}
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  card: {
    cursor: "pointer",
  },
  locations: {
    padding: theme.spacing(1),
  },
  empty: {
    textAlign: "center",
  },
}));
