import React from "react";
import clsx from "clsx";
import {
  Button,
  Box,
  Typography,
  Divider,
  makeStyles,
} from "@material-ui/core";

import AddressForm from "./address-form";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../store/actions/auth";
import EditCardLayout from "../../common/edit-card-layout";

const Addresses = () => {
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
    <EditCardLayout header="Saved addresses">
      <>
        {user.addresses && user.addresses.length > 0 ? (
          user.addresses.map((address, i) => {
            return (
              <div key={i}>
                <Box className={clsx(classes.address)}>
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
      </>
      <Button variant="text" color="primary" fullWidth onClick={addNewAddress}>
        Add new address
      </Button>
    </EditCardLayout>
  );
};

const useStyles = makeStyles((theme) => ({
  address: {
    display: "flex",
    alignItems: "center",
    // padding: theme.spacing(1),
  },
}));

export default Addresses;
