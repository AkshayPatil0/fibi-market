import React from "react";

import { Box, makeStyles, Paper } from "@material-ui/core";

import Slider from "react-slick";

export default function Banners() {
  const classes = useStyles();

  return (
    <Box p={1}>
      <Slider
        slidesPerRow={1}
        // slidesToScroll={1}
        arrows={false}
        dots
        infinite
      >
        <Box>
          <Paper className={classes.paper} elevation={2}>
            1
          </Paper>
        </Box>
        <Box>
          <Paper className={classes.paper} elevation={2}>
            2
          </Paper>
        </Box>
        <Box>
          <Paper className={classes.paper} elevation={2}>
            3
          </Paper>
        </Box>
      </Slider>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 300,
    margin: theme.spacing(1),
  },
}));
