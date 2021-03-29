import React from "react";
import { Box, makeStyles, Card } from "@material-ui/core";

const ToolbarLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Box className={classes.wrapper}>{children}</Box>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export default ToolbarLayout;
