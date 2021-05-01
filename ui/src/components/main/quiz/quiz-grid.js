import React from "react";
import { Box, makeStyles, Grid } from "@material-ui/core";

import QuizCard from "./quiz-card";

export default function QuizGrid({ isLoading, quizes }) {
  const classes = useStyles();

  return (
    <>
      {!isLoading &&
        quizes.map((quiz) => (
          <Grid item xs={12} md={4} sm={12}>
            <Box className={classes.productCard} height="100%">
              <QuizCard quiz={quiz} />
            </Box>
          </Grid>
        ))}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  productCard: {
    height: "100%",
  },
}));
