import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  CardContent,
  IconButton,
  CardMedia,
  makeStyles,
} from "@material-ui/core";
import { AddCircle, RemoveCircle, Delete } from "@material-ui/icons";

import { addToCart, removeFromCart } from "../../store/actions/order";
import Pricing from "../common/pricing";

function ProductListItem({ product, quantity, variant }) {
  const classes = useStyles();

  const router = useHistory();

  const onAdd = async () => {
    await dispatch(addToCart(product.id, 1, variant?.id));
  };

  const onRemove = async () => {
    if (quantity < 2 || quantity > 10) return;
    await dispatch(removeFromCart(product.id, 1, variant?.id));
  };

  const onDelete = async () => {
    await dispatch(removeFromCart(product.id, 10, variant?.id));
  };

  console.log({ product, quantity, variant });
  return (
    <div className={classes.root}>
      <CardContent className={classes.content}>
        <CardMedia
          className={classes.media}
          image={
            product.images
              ? product.images[0]
              : "https://fibimarket-dev.s3.ap-south-1.amazonaws.com/users/6048a2ed81735b0fd86b1292.jpeg"
          }
          title={product.title}
          style={{ backgroundSize: "contain" }}
        />
        <div className={classes.details}>
          <Typography component="h6" variant="body1">
            <Link to={`/products/${product.id}`}>{product.title}</Link>
          </Typography>
          {variant ? (
            <Pricing {...variant.price} small />
          ) : (
            <Pricing {...product.price} small />
          )}
          <Box>
            {variant &&
              Object.entries(variant.variation).map(([name, opt]) => (
                <span>
                  <Typography key={name}>
                    {name} : {opt}
                  </Typography>
                </span>
              ))}
          </Box>
          <Box flex="1" />
          <div className={classes.quantity}>
            <IconButton size="small" color="primary" onClick={onRemove}>
              <RemoveCircle />
            </IconButton>
            <Typography
              component="p"
              variant="subtitle2"
              color="textSecondary"
              className={classes.quantityText}
            >
              {quantity}
            </Typography>
            <IconButton size="small" color="primary" onClick={onAdd}>
              <AddCircle />
            </IconButton>
          </div>
        </div>
        <IconButton
          className={classes.iconButton}
          size="small"
          onClick={onDelete}
        >
          <Delete color="error" />
        </IconButton>
      </CardContent>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},
  details: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(0, 2),
  },
  content: {
    display: "flex",
    padding: theme.spacing(1),
  },
  media: {
    padding: 10,
    minWidth: theme.spacing(15),
    minHeight: theme.spacing(15),
  },
  quantity: {
    display: "flex",
    alignItems: "center",
  },
  iconButton: {
    alignSelf: "flex-start",
  },
  quantityText: {
    padding: theme.spacing(0.5),
  },
  controls: {
    display: "flex",
    alignItems: "center",
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default ProductListItem;
