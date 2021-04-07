import React from "react";
import {
  Container,
  Grid,
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
      <CardHeader title={header} titleTypographyProps={{ variant: "h6" }} />
      <Divider />
      <CardContent>{children[0]}</CardContent>
      <Divider />
      <CardActions>{children[1]}</CardActions>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "visible",
  },
}));

export default EditCardLayout;
