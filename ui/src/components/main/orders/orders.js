import React, { useEffect } from "react";

import {
  Grid,
  Card,
  Typography,
  makeStyles,
  CardHeader,
  Divider,
  CardContent,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../../store/actions/order";

import OrderListItem from "./order-list-item";

export default function Orders() {
  const classes = useStyles();

  const orders = useSelector((state) => state.order.orders);
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    const run = async () => {
      try {
        await dispatch(getMyOrders());
      } catch (err) {
        console.error(err);
      }
    };
    run();
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="My orders" />
            <Divider />

            {user && orders.length > 0 ? (
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
    minHeight: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
