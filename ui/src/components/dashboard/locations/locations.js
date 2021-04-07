import React from "react";

import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Container,
  makeStyles,
} from "@material-ui/core";
import LocationList from "./location-list";
import { getLocationsState } from "../../../utils";

export default function Locations() {
  const classes = useStyles();

  const locations = getLocationsState();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="All locations" />
              <Divider />
              <CardContent>
                <LocationList locations={locations} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  locations: {
    padding: theme.spacing(1),
  },
  empty: {
    textAlign: "center",
  },
}));
