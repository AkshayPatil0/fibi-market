import React from "react";
import clsx from "clsx";
import {
  Button,
  Box,
  Typography,
  Card,
  CardHeader,
  CardActions,
  Divider,
  makeStyles,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";

import AddressForm from "./address-form";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../store/actions/auth";

const Addresses = ({ selectedIndex, setSelectedIndex }) => {
  const classes = useStyles();

  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();
  const addNewAddress = () => {
    dispatch(
      setUser({
        ...user,
        addresses: [...user.addresses, false],
      })
    );
  };

  return (
    <Card>
      <CardHeader title="Delivery address" />
      <Divider />
      <RadioGroup
        value={selectedIndex}
        onChange={(e) => setSelectedIndex(parseInt(e.target.value))}
      >
        {user.addresses && user.addresses.length > 0 ? (
          user.addresses.map((address, i) => {
            return (
              <div key={i}>
                <Box
                  className={clsx(
                    classes.address,
                    selectedIndex === i && classes.selectAddress
                  )}
                >
                  <FormControlLabel
                    value={i}
                    control={<Radio color="primary" />}
                  />
                  <AddressForm address={address} index={i} key={i} />
                </Box>
                <Divider />
              </div>
            );
          })
        ) : (
          <>
            <Box p={2}>
              <Typography>No addresses found !</Typography>
            </Box>
            <Divider />
          </>
        )}
      </RadioGroup>
      <CardActions>
        <Button
          variant="text"
          color="primary"
          fullWidth
          onClick={addNewAddress}
        >
          Add new address
        </Button>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  address: {
    display: "flex",
    alignItems: "center",
    "& > *": {
      margin: 0,
    },
  },
  selectAddress: {
    backgroundColor: theme.palette.primary.light,
  },
}));

export default Addresses;
