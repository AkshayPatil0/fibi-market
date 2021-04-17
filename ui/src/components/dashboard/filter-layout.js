import React from "react";
import {
  Box,
  Button,
  CardContent,
  makeStyles,
  Grid,
  Card,
} from "@material-ui/core";

const FilterLayout = ({ children, applyFilters, clearFilters }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box>
          <form onSubmit={applyFilters}>
            <Grid container spacing={2}>
              {children}
            </Grid>
            <Box m={1} />
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  className={classes.button}
                >
                  Apply
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={clearFilters}
                  className={classes.button}
                >
                  Clear filters
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "visible",
    padding: theme.spacing(1, 0, 0, 0),
    margin: theme.spacing(1, 0),
  },
}));

export default FilterLayout;
