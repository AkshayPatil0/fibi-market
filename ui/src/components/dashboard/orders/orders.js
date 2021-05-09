import React, { useState, useEffect } from "react";

import {
  Grid,
  Card,
  Typography,
  Container,
  makeStyles,
  Box,
  Avatar,
  Link,
  IconButton,
  Button,
  Menu,
  Popover,
} from "@material-ui/core";

import { useOrderHook } from "./order-hook";

import OrderListItem from "./order-list-item";
import Toolbar from "./order-toolbar";
import OrderFilter from "./order-filter";
import { useDispatch, useSelector } from "react-redux";
import { isAdmin, isUser } from "../../../utils";

import {
  getMyOrders,
  getOrders,
  updateOrderStatus,
} from "../../../store/actions/order";
import { useHistory } from "react-router";
import { Image, Visibility } from "@material-ui/icons";
import Table from "../../common/table";

export default function Orders() {
  const classes = useStyles();

  // const { orders } = useOrderHook();

  const orders = useSelector((state) => state.order.orders);
  const user = useSelector((state) => state.auth.currentUser);

  const [rows, setRows] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    const run = async () => {
      try {
        // if (user.role === "user") {
        // await dispatch(getMyOrders());
        // }

        await dispatch(
          getOrders({ vendor: user.role === "vendor" ? user.id : undefined })
        );
      } catch (err) {
        console.error(err);
      }
    };
    run();
  }, [dispatch]);

  const options = [
    { head: "Product", key: "product" },
    { head: "Quantity", key: "quantity" },
    { head: "Amount", key: "amount" },
    { head: "Address", key: "address" },
    { head: "User", key: "user" },
    { head: "Vendor", key: "vendor" },
    { head: "Status", key: "status" },
  ];

  const router = useHistory();

  useEffect(() => {
    let newRows = [];
    orders.forEach((order) => {
      if (order.isGroup) {
        return;
      }
      console.log(order);
      let row = {};

      row.id = order.id;
      row.product = (
        <Box alignItems="center" display="flex">
          <Box ml={2} mr={2}>
            <Avatar src={order.product?.images?.[0]} variant="square">
              <Image />
            </Avatar>
          </Box>
          <Typography color="textPrimary" variant="body1">
            <Link to={`/products/${order?.product?.id}`}>
              {order.product?.title}
            </Link>
          </Typography>
        </Box>
      );

      row.quantity = <Typography>{order?.quantity}</Typography>;
      row.amount = <Typography>{"₹ " + order?.price?.retail}</Typography>;

      row.status = <SetStatusMenu order={order} />;
      row.user = <Typography>{order.user?.email}</Typography>;
      row.vendor = <Typography>{order.vendor?.email}</Typography>;
      row.address = <AddressMenu address={order.address} />;

      newRows.push(row);
    });

    setRows(newRows);
  }, [orders, router, dispatch]);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Toolbar />
        <OrderFilter />
        <Box mt={3}>
          <Table rows={rows} options={options} />
        </Box>
        <Box p={3} />
      </Container>
    </div>
  );
}

const SetStatusMenu = ({ order }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const statuses = ["dispatched", "cancelled", "delivered"];

  const onSetStatus = (status) => {
    dispatch(updateOrderStatus(order.id, status));
  };

  return (
    <>
      <Button
        size="small"
        edge="end"
        aria-label="set status of order"
        aria-haspopup="true"
        color="primary"
        variant="contained"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        {order.status}
      </Button>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        transformOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        // keepMounted
        onClick={handleCloseMenu}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <Box display="flex" flexDirection="column" px={2}>
          {statuses.map((status) => (
            <Button size="small" onClick={() => onSetStatus(status)}>
              {status}
            </Button>
          ))}
        </Box>
      </Menu>
    </>
  );
};

const AddressMenu = ({ address }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton
        aria-describedby={"id"}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <Visibility />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box className={classes.addressRoot}>
          <Box flex={1} className={classes.addressContent}>
            <Typography variant="body1">
              <b>{address?.name}</b>
            </Typography>
            <Typography>{address?.phone}</Typography>
            <Typography>{address?.address}</Typography>
            <Typography>
              {address?.locality}, {address?.pincode}{" "}
            </Typography>
            <Typography>
              {address?.city}, {address?.state}
            </Typography>
          </Box>
        </Box>
      </Popover>
    </div>
  );
};

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
  addressRoot: {
    padding: theme.spacing(1, 2, 1, 1),
    display: "flex",
    flex: 1,
  },
}));
