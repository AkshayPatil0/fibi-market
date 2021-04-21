import React, { useState } from "react";
import clsx from "clsx";
import {
  Button,
  Grid,
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  makeStyles,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

import TextInput from "../../common/input";

const PaymentMethods = ({ selectedMethod, setSelectedMethod }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cardMethod = (
    <Box p={1} pr={2}>
      <Box py={1}>
        <Typography>
          <b>Credit/debit card</b>
        </Typography>
      </Box>
      <Grid container spacing={1} style={{ fontSize: "14px" }}>
        <TextInput
          label="Card no."
          name="cardno"
          value={formData.phone}
          handleChange={handleChange}
          margin="dense"
          type="text"
          required
        />
        <TextInput
          label="Card holder name"
          name="name"
          value={formData?.name}
          handleChange={handleChange}
          margin="dense"
          type="text"
          required
        />
        <TextInput
          label="Expiry date"
          name="expiry"
          value={formData?.address}
          handleChange={handleChange}
          margin="dense"
          xs={8}
          sm={6}
          required
        />
        <TextInput
          label="CVV"
          name="cvv"
          value={formData?.locality}
          handleChange={handleChange}
          margin="dense"
          xs={4}
          sm={6}
          required
        />
      </Grid>
      <Box display="flex" justifyContent="flex-end" py={2}>
        <Button variant="contained" color="primary" size="small">
          Pay
        </Button>
      </Box>
    </Box>
  );

  return (
    <Card>
      <CardHeader title="Payment method" />
      <Divider />
      <RadioGroup
        value={selectedMethod}
        onChange={(e) => setSelectedMethod(e.target.value)}
      >
        <Box
          className={clsx(
            classes.method,
            selectedMethod === "card" && classes.selectedMethod
          )}
        >
          <Box className={classes.radio}>
            <FormControlLabel
              value="card"
              control={<Radio color="primary" />}
            />
          </Box>
          {cardMethod}
        </Box>
        <Divider />
        <Box
          className={clsx(
            classes.method,
            selectedMethod === "cod" && classes.selectedMethod
          )}
        >
          <Box className={classes.radio}>
            <FormControlLabel value="cod" control={<Radio color="primary" />} />
          </Box>
          <Box p={1}>
            <Typography>
              <b>Cash on delivery</b>
            </Typography>
          </Box>
        </Box>
      </RadioGroup>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  method: {
    display: "flex",
    alignItems: "center",
  },
  selectedMethod: {
    backgroundColor: theme.palette.primary.light,
  },
  radio: {
    "& > *": {
      margin: 0,
    },
  },
}));

export default PaymentMethods;
