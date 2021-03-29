import { Box, Typography, makeStyles, Grid } from "@material-ui/core";
import React from "react";
import { getSavingPercentage } from "../../utils";

const Pricing = ({ mrp, retail, small }) => {
  const classes = useStyles();
  return (
    // <Box
    //   display="flex"
    //   alignItems="center"
    //   flexWrap="wrap"
    //   className={classes.price}
    //   // style={{fontSize: }}
    //   fontSize={small ? "14px" : "inherit"}
    //   py={small ? 1 : 2}
    // >
    <Grid
      item
      container
      spacing={1}
      style={{
        fontSize: small ? "12px" : "inherit",
        padding: small ? "0.5rem 0" : "1rem 0",
      }}
    >
      <Grid className={classes.item}>
        <Typography className={classes.priceRetail} variant="h5">
          {`Rs. ${retail} `}
        </Typography>
      </Grid>
      <Grid className={classes.item}>
        <Typography className={classes.priceMrp} variant="h6">
          {`Rs. ${mrp} `}
        </Typography>
      </Grid>
      <Grid className={classes.item}>
        <Typography className={classes.saving} variant="h6" color="secondary">
          ({getSavingPercentage(mrp, retail)}% OFF)
        </Typography>
      </Grid>
    </Grid>
    // </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  // price: {
  //   padding: theme.spacing(2, 0),
  // },
  priceMrp: {
    textDecoration: "line-through",
    color: "grey",
    // padding: theme.spacing(0, 2),
  },
  item: {
    padding: theme.spacing(0, 0.5),
  },
  // saving: {
  //   color: theme.palette.secondary,
  // },
}));

export default Pricing;
