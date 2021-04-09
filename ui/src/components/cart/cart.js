import React, { useEffect, useState } from "react";

import {
  Button,
  Grid,
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Container,
  makeStyles,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  getCart,
  placeOrder,
  setOrderField,
} from "../../store/actions/order";
import { useHistory } from "react-router";
import MyCartCard from "./my-cart";
import Addresses from "./addresses";
import PriceDetails from "./price-details";
import PaymentMethods from "./payment-method";

function getSteps() {
  return ["My cart", "Delivery address", "Payment"];
}

function getStepAction(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "Place order";
    case 1:
      return "Select address";
    case 2:
      return "Confirm order";
    default:
      return <div />;
  }
}

export default function Cart() {
  const classes = useStyles();

  const cart = useSelector((state) => state.order.cart);
  const user = useSelector((state) => state.auth.currentUser);
  const router = useHistory();

  const [activeStep, setActiveStep] = useState(0);

  const [addressIndex, setAddressIndex] = useState(-1);
  const [paymentMethod, setPaymentMethod] = useState("");

  const steps = getSteps();
  const dispatch = useDispatch();
  const handleNext = async () => {
    switch (activeStep) {
      case 0:
        await dispatch(createOrder());
        break;
      case 1:
        await dispatch(
          setOrderField({ address: user.addresses[addressIndex] })
        );
        break;
      case 2:
        await dispatch(setOrderField({ payment: { method: paymentMethod } }));
        await dispatch(placeOrder());
        router.push("/dashboard/orders");
        break;
      default:
        break;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  if (!cart?.products || cart.products.length < 1) {
    return (
      <div className={classes.root}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="My cart" />
                <Divider />
                <CardContent className={classes.empty}>
                  <Typography variant="subtitle1">
                    Your cart is empty !
                  </Typography>
                  {!user && (
                    <>
                      <Typography variant="body2">
                        Login to see the items you added previously
                      </Typography>
                      <Box p={2}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => router.push("/auth/signin")}
                        >
                          Login
                        </Button>
                      </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isNextDisabled = () => {
    switch (activeStep) {
      case 0:
        return false;
      case 1:
        return addressIndex === -1;
      case 2:
        return paymentMethod !== "cod";
      default:
        return;
    }
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <MyCartCard />;
      case 1:
        return (
          <Addresses
            selectedIndex={addressIndex}
            setSelectedIndex={setAddressIndex}
          />
        );
      case 2:
        return (
          <PaymentMethods
            selectedMethod={paymentMethod}
            setSelectedMethod={setPaymentMethod}
          />
        );
      default:
        return <div />;
    }
  }

  return (
    <div className={classes.root}>
      <Box className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Card>
          </Grid>
          <Grid item lg={8} md={7} xs={12}>
            {getStepContent(activeStep)}
          </Grid>
          <Grid item lg={4} md={5} xs={12}>
            <PriceDetails />
          </Grid>
        </Grid>
      </Box>
      <Card className={classes.bottomCard}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className={classes.backButton}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={isNextDisabled()}
        >
          {getStepAction(activeStep)}
        </Button>
      </Card>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingTop: theme.spacing(2),
    paddingBottom: `calc(64px + ${theme.spacing(2)}px)`,
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
  bottomCard: {
    padding: "10px",
    backgroundColor: "#fff",
    position: "fixed",
    bottom: "0",
    right: "0",
    width: "100%",
    height: 64,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(1, 5),
    },
  },
}));
