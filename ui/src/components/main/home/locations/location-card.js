import React from "react";
import {
  Typography,
  makeStyles,
  Card,
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

  const router = useHistory();

  const handleClick = () => {
    if (location.blog) {
      router.push(`/explore/${location.slug}/${location.blog}`);
    } else {
      router.push(`/locations/${location.slug}`);
    }
  };

  return (
    <Card className={classes.root}>
      <Box
        className={classes.content}
        flexDirection={alt || isXs || isLg ? "row" : "row-reverse"}
      >
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
        <Grid item xs={12} sm={7}>
          <Box p={2}>
            <Typography variant="h5">
              <b>{location.title}</b>
            </Typography>
            <Box p={1} />
            <Typography>{location.description}</Typography>
            <Box pt={2}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={handleClick}
              >
                Explore
              </Button>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      boxShadow: theme.shadows[5],
    },
    height: "100%",
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
    padding: theme.spacing(2),
  },
  image: {
    height: "100%",
    maxHeight: "256px",
    width: "100%",
    objectFit: "contain",
  },
}));
