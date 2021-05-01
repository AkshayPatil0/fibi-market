import {
  Box,
  Card,
  Grid,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuizes, getQuizes } from "../../../store/actions/quizes";
import QuizGrid from "./quiz-grid";

function Quiz() {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const quizes = useSelector((state) => state.quiz.all_quizes);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchQuizes = async () => {
      setIsLoading(true);
      try {
        await dispatch(getAllQuizes());
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuizes();
  }, [dispatch]);
  const emptyResult = (
    <Card>
      <Box
        minHeight="60vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h4" color="textPrimary">
          Sorry, no Quizes for today !
        </Typography>
      </Box>
    </Card>
  );

  return (
    <div className={classes.root}>
      <h2 className={classes.title}>Daily Quizes</h2>
      <Grid container spacing={1}>
        <Grid
          item
          container
          xs={12}
          md={12}
          spacing={1}
          alignContent="flex-start"
        >
          <Grid item container xs={12} spacing={1}>
            {!isLoading && quizes && quizes.length > 0 ? (
              <QuizGrid quizes={quizes} isLoading={isLoading} />
            ) : (
              <Grid item xs={12}>
                {!isLoading && emptyResult}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
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
  title: {
    paddingBottom: 10,
  },
}));

export default Quiz;
