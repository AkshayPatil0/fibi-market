import React from "react";

import {
  Grid,
  Card,
  Typography,
  makeStyles,
  CardHeader,
  Divider,
  CardContent,
} from "@material-ui/core";

import { useOrderHook } from "./order-hook";

import OrderListItem from "./order-list-item";

export default function Orders() {
  const classes = useStyles();

  const { orders } = useOrderHook();

  // const user = useSelector((state) => state.auth.currentUser);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="My orders" />
            <Divider />

            {orders.length > 0 ? (
              orders.map((order) => {
                return (
                  <div key={order.id}>
                    <OrderListItem order={order} />
                    <Divider />
                  </div>
                );
              })
            ) : (
              <CardContent className={classes.empty}>
                <Typography variant="subtitle1">No orders found !</Typography>
              </CardContent>
            )}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingTop: theme.spacing(2),
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
