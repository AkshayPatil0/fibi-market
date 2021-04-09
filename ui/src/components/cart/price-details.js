import React from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Divider,
  makeStyles,
} from "@material-ui/core";

import { getCartTotal } from "../../utils";
import { useSelector } from "react-redux";

const PriceDetails = () => {
  const classes = useStyles();
  const cart = useSelector((state) => state.order.cart);
  const { totalCost, totalPrice, totalDiscount } = getCartTotal(cart.products);
  return (
    <Card>
      <CardHeader title="Price details" />
      <Divider />
      <CardContent className={classes.priceDetails}>
        <div className={classes.priceDiv}>
          <Typography variant="body1">Total MRP</Typography>
          <Typography variant="h6">₹ {totalCost}</Typography>
        </div>
        <div className={classes.priceDiv}>
          <Typography variant="body1">Discount</Typography>
          <Typography variant="h6" style={{ color: "green" }}>
            ₹ {totalDiscount}
          </Typography>
        </div>
        <Box mt={2} mb={1}>
          <Divider variant="fullWidth" />
        </Box>
        <div className={classes.priceDiv}>
          <Typography variant="h6">Total amount</Typography>
          <Typography variant="h6">₹ {totalPrice}</Typography>
        </div>
        <Box mt={2} mb={1}>
          <Divider variant="fullWidth" />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h6" style={{ color: "green" }}>
            You will save ₹ {totalDiscount} on this order !
          </Typography>
        </Box>
      </CardContent>
      {/* {isLoading && <LinearProgress />} */}
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingTop: theme.spacing(2),
    paddingBottom: `calc(64px + ${theme.spacing(2)}px)`,
  },
  products: {
    padding: theme.spacing(1),
  },
  empty: {
    textAlign: "center",
  },
  priceDetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // alignItems: "",
  },
  priceDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomCard: {
    padding: "10px",
    backgroundColor: "#fff",
    position: "fixed",
    bottom: "0",
    // right: "0",
    width: "100%",
    height: 64,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(1, 5),
    },
  },
}));

export default PriceDetails;
