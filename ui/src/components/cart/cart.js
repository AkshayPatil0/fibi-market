import React from "react";

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

import ProductListItem from "../products/product-list-item";

import { useCartHook } from "./cart-hook";

export default function Cart() {
  const classes = useStyles();

  const { cart, placeOrder } = useCartHook();

  if (!cart?.products) {
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
                  cart.products.map(({ product, quantity }) => {
                    return (
                      <>
                        <Box mt={1} mb={1}>
                          <ProductListItem
                            product={product}
                            quantity={quantity}
                          />
                          <Divider />
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
                <div>
                  <Typography variant="h6">Total</Typography>
                </div>
                <div>
                  <Typography>{cart.totalCost}</Typography>
                </div>
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
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
