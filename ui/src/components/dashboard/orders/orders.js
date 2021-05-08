import React, { useState, useEffect } from "react";

import {
  Grid,
  Card,
  Typography,
  Container,
  makeStyles,
} from "@material-ui/core";

import { useOrderHook } from "./order-hook";

import OrderListItem from "./order-list-item";
import Toolbar from "./order-toolbar";
import OrderFilter from "./order-filter";
import { useDispatch, useSelector } from "react-redux";
import { isUser } from "../../../utils";

import { getMyOrders, getOrders } from "../../../store/actions/order";
import { useHistory } from "react-router";

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
    { head: "Title", key: "title" },
    { head: "MRP", key: "mrp" },
    { head: "Retail price", key: "retail" },
    { head: "Stock", key: "stock" },
    { head: "Category", key: "category" },
    { head: "Actions", key: "actions" },
  ];

  const router = useHistory();

  useEffect(() => {
    // const onDelete = async (id) => {
    //   try {
    //     await dispatch(deleteProduct(id));
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };
    // const onPublish = async (id, ifPublish) => {
    //   try {
    //     await dispatch(publishProduct(id, ifPublish));
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };
    let newRows = [];
    orders.forEach((order) => {
      console.log(order);
      // let row = {};

      // row.id = product.id;
      // row.title = (
      //   <Box alignItems="center" display="flex">
      //     <Box ml={2} mr={2}>
      //       <Avatar src={product?.images[0]} variant="square">
      //         <Image />
      //       </Avatar>
      //     </Box>
      //     <Typography color="textPrimary" variant="body1">
      //       <Link to={`/products/${product.id}`}>{product?.title}</Link>
      //     </Typography>
      //   </Box>
      // );

      // row.mrp = <Typography>{"₹ " + product?.price.mrp}</Typography>;
      // row.retail = <Typography>{"₹ " + product?.price.retail}</Typography>;
      // row.stock = <Typography>{product?.stock}</Typography>;
      // row.category = <Typography>{product.category?.title || "NA"}</Typography>;
      // if (isAdmin(user)) {
      //   row.actions = (
      //     <>
      //       <IconButton
      //         size="small"
      //         onClick={() => onPublish(product.id, product.ifPublish)}
      //       >
      //         {
      //           (row.actions = product.ifPublish ? (
      //             <Archive color="error" />
      //           ) : (
      //             <Unarchive color="primary" />
      //           ))
      //         }
      //       </IconButton>
      //       <IconButton
      //         size="small"
      //         onClick={() =>
      //           router.push(`/dashboard/products/update/${product.id}`)
      //         }
      //       >
      //         <Visibility color="primary" />
      //       </IconButton>
      //     </>
      //   );
      // } else {
      //   row.actions = (
      //     <>
      //       <IconButton
      //         size="small"
      //         onClick={() =>
      //           router.push(`/dashboard/products/update/${product.id}`)
      //         }
      //       >
      //         <Edit color="primary" />
      //       </IconButton>
      //       <IconButton size="small" onClick={() => onDelete(product.id)}>
      //         <Delete color="secondary" />
      //       </IconButton>
      //     </>
      //   );
      // }

      // newRows.push(row);
    });

    setRows(newRows);
  }, [orders, router, dispatch]);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        {!isUser(user) && <Toolbar />}
        {!isUser(user) && <OrderFilter />}
        <Grid container></Grid>
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
