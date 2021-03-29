import React, { useEffect } from "react";

import {
  Button,
  Grid,
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Container,
  makeStyles,
} from "@material-ui/core";

import ProductListItem from "./product-list-item";

import { getCartState, getCartTotal } from "../../../utils";
import { useDispatch } from "react-redux";
import { getCart } from "../../../store/actions/order";

export default function Cart() {
  const classes = useStyles();

  const cart = getCartState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, []);

  const placeOrder = () => {};

  if (!cart?.products || cart.products.length < 1) {
    return (
      <div className={classes.root}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  title="My cart"
                  titleTypographyProps={{ variant: "h6" }}
                />
                <Divider />
                <CardContent className={classes.empty}>
                  <Typography variant="subtitle1">
                    Your cart is empty!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }

  const { totalCost, totalPrice, totalDiscount } = getCartTotal(cart.products);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item lg={8} md={6} xs={12}>
            <Card>
              <CardHeader
                title="My cart"
                titleTypographyProps={{ variant: "h6" }}
              />
              <Divider />
              <CardContent className={classes.products}>
                {cart &&
                  cart.products &&
                  cart.products.map(({ product, quantity, variantId }, i) => {
                    // console.log({ product, quantity, variant });
                    return (
                      <>
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
                      </>
                    );
                  })}
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
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
              <Divider />
              <CardActions>
                <Button
                  color="primary"
                  fullWidth
                  variant="text"
                  onClick={placeOrder}
                >
                  Place order
                </Button>
              </CardActions>
              {/* {isLoading && <LinearProgress />} */}
            </Card>
          </Grid>
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
    paddingTop: theme.spacing(3),
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
