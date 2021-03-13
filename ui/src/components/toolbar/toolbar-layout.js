import React, { useState } from "react";
import { Box, makeStyles, Card } from "@material-ui/core";

const ToolbarLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Box display="flex" flexWrap="wrap">
        {children}
      </Box>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

export default ToolbarLayout;
