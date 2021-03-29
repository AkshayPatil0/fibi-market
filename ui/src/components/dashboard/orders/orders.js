import React from "react";

import {
  Grid,
  Card,
  Typography,
  Container,
  makeStyles,
} from "@material-ui/core";

import { useOrderHook } from "./order-hook";

import OrderListItem from "./order-list-item";
import Toolbar from "../toolbar/order-toolbar";
import OrderFilter from "../filter/order-filter";
import { useSelector } from "react-redux";
import { isUser } from "../../../utils";

export default function Orders() {
  const classes = useStyles();

  const { orders } = useOrderHook();

  const user = useSelector((state) => state.auth.currentUser);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        {!isUser(user) && <Toolbar />}
        {!isUser(user) && <OrderFilter />}
        <Grid container>
          {orders.length > 0 ? (
            orders.map((order) => {
              return (
                <Grid item xs={12} key={order.id}>
                  <OrderListItem order={order} />
                </Grid>
              );
            })
          ) : (
            <Grid item xs={12}>
              <Card className={classes.empty}>
                <Typography variant="subtitle1">No orders found !</Typography>
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    // minHeight: '100%',
    paddingBottom: theme.spacing(3),
  },
  products: {
    padding: theme.spacing(1),
  },
  priceDetails: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  empty: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));
