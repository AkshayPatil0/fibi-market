import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  makeStyles,
  CardActions,
} from "@material-ui/core";

const EditCardLayout = ({ header, children }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader title={header} />
      <Divider />
      <CardContent>{children[0]}</CardContent>
      <Divider />
      <CardActions className={classes.actions}>{children[1]}</CardActions>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "visible",
  },
  // actions: {
  //   fontSize: "0.9em",
  // },
}));

export default EditCardLayout;
