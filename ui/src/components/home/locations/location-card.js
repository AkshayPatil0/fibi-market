import React from "react";
import {
  Typography,
  makeStyles,
  Card,
  CardContent,
  Grid,
  Box,
  useTheme,
  useMediaQuery,
  Button,
} from "@material-ui/core";

import { useHistory } from "react-router";

export default function LocationCard({ location, alt }) {
  const classes = useStyles();

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });
  const isLg = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true,
  });

  const image = (
    <Grid item xs={12} sm={5}>
      <img
        className={classes.image}
        src={
          location.image ||
          "https://pbs.twimg.com/profile_images/956458175540076544/_fl_vAhA_400x400.jpg"
        }
        alt={location.title}
      />
    </Grid>
  );

  const router = useHistory();

  const details = (
    <Grid item xs={12} sm={7}>
      <Box p={2}>
        <Typography variant="h5">
          <b>{location.title}</b>
        </Typography>
        <Box p={1} />
        <Typography>
          Tempor quis ea proident esse adipisicing ullamco pariatur officia
          consectetur consectetur nulla et ex. Labore eiusmod do cupidatat anim
          excepteur. Lorem in do fugiat nostrud nostrud aliqua id minim
          consequat qui nulla. Magna est tempor ad nisi.
        </Typography>
        <Box pt={2}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => router.push(`/locations/${location.slug}`)}
          >
            Explore
          </Button>
        </Box>
      </Box>
    </Grid>
  );

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        {alt || isXs || isLg ? (
          <>
            {image}
            {details}
          </>
        ) : (
          <>
            {details}
            {image}
          </>
        )}
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: theme.spacing(2),
    "&:hover": {
      boxShadow: theme.shadows[5],
    },
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
  },
  image: {
    height: "100%",

    maxHeight: "256px",
    width: "100%",
    objectFit: "contain",
  },
}));
