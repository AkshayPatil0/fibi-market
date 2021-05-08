import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import {
  LinearProgress,
  Box,
  Container,
  makeStyles,
  Avatar,
  Typography,
  IconButton,
} from "@material-ui/core";
import {
  Archive,
  Delete,
  Edit,
  Image,
  Unarchive,
  Visibility,
} from "@material-ui/icons";

import ProductToolbar from "./product-toolbar";

import ProductFilter from "./product-filter";
import Table from "../../common/table";
import {
  deleteProduct,
  getProducts,
  publishProduct,
} from "../../../store/actions/product";
import { isAdmin } from "../../../utils";

export default function Products() {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.currentUser);

  const [isLoading, setIsLoading] = useState(false);

  const products = useSelector((state) => state.product.products);

  const [rows, setRows] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const run = async () => {
      setIsLoading(true);
      try {
        await dispatch(
          getProducts({ vendor: user.role === "vendor" ? user.id : undefined })
        );
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, [dispatch, user.role, user.id]);

  const options = [
    { head: "Title", key: "title" },
    { head: "MRP", key: "mrp" },
    { head: "Retail price", key: "retail" },
    { head: "Stock", key: "stock" },
    { head: "Category", key: "category" },
    // { head: "Edit", key: "edit" },
    // { head: "Delete", key: "delete" },
    { head: "Actions", key: "actions" },
  ];

  const router = useHistory();

  useEffect(() => {
    const onDelete = async (id) => {
      try {
        await dispatch(deleteProduct(id));
      } catch (err) {
        console.error(err);
      }
    };
    const onPublish = async (id, ifPublish) => {
      try {
        await dispatch(publishProduct(id, ifPublish));
      } catch (err) {
        console.error(err);
      }
    };
    let newRows = [];
    products.forEach((product) => {
      let row = {};

      row.id = product.id;
      row.title = (
        <Box alignItems="center" display="flex">
          <Box ml={2} mr={2}>
            <Avatar src={product?.images[0]} variant="square">
              <Image />
            </Avatar>
          </Box>
          <Typography color="textPrimary" variant="body1">
            <Link to={`/products/${product.id}`}>{product?.title}</Link>
          </Typography>
        </Box>
      );

      row.mrp = <Typography>{"₹ " + product?.price.mrp}</Typography>;
      row.retail = <Typography>{"₹ " + product?.price.retail}</Typography>;
      row.stock = <Typography>{product?.stock}</Typography>;
      row.category = <Typography>{product.category?.title || "NA"}</Typography>;
      if (isAdmin(user)) {
        row.actions = (
          <>
            <IconButton
              size="small"
              onClick={() => onPublish(product.id, product.ifPublish)}
            >
              {
                (row.actions = product.ifPublish ? (
                  <Archive color="error" />
                ) : (
                  <Unarchive color="primary" />
                ))
              }
            </IconButton>
            <IconButton
              size="small"
              onClick={() =>
                router.push(`/dashboard/products/update/${product.id}`)
              }
            >
              <Visibility color="primary" />
            </IconButton>
          </>
        );
      } else {
        row.actions = (
          <>
            <IconButton
              size="small"
              onClick={() =>
                router.push(`/dashboard/products/update/${product.id}`)
              }
            >
              <Edit color="primary" />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(product.id)}>
              <Delete color="secondary" />
            </IconButton>
          </>
        );
      }

      newRows.push(row);
    });

    setRows(newRows);
  }, [products, router, dispatch]);

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <ProductToolbar />
        <ProductFilter />
        <Box mt={3}>
          <Table rows={rows} options={options} />
        </Box>
        <Box p={3} />
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
  },
  productCard: {
    height: "100%",
  },
}));
