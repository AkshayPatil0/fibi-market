import React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  makeStyles,
} from "@material-ui/core";
import ProductListItem from "./product-list-item";
import { useSelector } from "react-redux";

const MyCartCard = () => {
  const classes = useStyles();
  const cart = useSelector((state) => state.order.cart);

  return (
    <Card>
      <CardHeader title="My cart" />
      <Divider />
      <CardContent className={classes.products}>
        {cart &&
          cart.products &&
          cart.products.map(({ product, quantity, variantId }, i) => {
            // console.log({ product, quantity, variant });
            return (
              <Box my={1} key={i}>
                <ProductListItem
                  product={product}
                  quantity={quantity}
                  variant={product.variants.find(
                    (variant) => variant.id === variantId
                  )}
                />
                {/* <Divider /> */}
              </Box>
            );
          })}
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),
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
}));

export default MyCartCard;
