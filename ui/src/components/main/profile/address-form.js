import React, { useEffect, useState } from "react";
import {
  Grid,
  makeStyles,
  IconButton,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";

import TextInput from "../../common/input";

import { useDispatch, useSelector } from "react-redux";
import { setUser, updateProfile } from "../../../store/actions/auth";

const AddressForm = ({ address, index }) => {
  const classes = useStyles();

  const initialAddress = {
    name: "",
    phone: "",
    address: "",
    locality: "",
    pincode: "",
    city: "",
    state: "",
  };
  const user = useSelector((state) => state.auth.currentUser);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(initialAddress);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const onSave = async () => {
    await dispatch(
      setUser({
        ...user,
        addresses: user.addresses.map((addr, i) =>
          i === index ? formData : addr
        ),
      })
    );
    await dispatch(updateProfile());
    setIsEdit(false);
  };

  const onDelete = async () => {
    await dispatch(
      setUser({
        ...user,
        addresses: user.addresses.filter((addr, i) => i !== index),
      })
    );
    dispatch(updateProfile());
  };

  useEffect(() => {
    if (address) {
      setFormData({ ...address });
    } else {
      setIsEdit(true);
    }
  }, [address]);

  if (isEdit) {
    return (
      <Box px={3} py={1}>
        <Grid container spacing={1}>
          <TextInput
            label="Full name"
            name="name"
            value={formData?.name}
            handleChange={handleChange}
            margin="dense"
            type="text"
            sm={6}
            required
          />
          <TextInput
            label="Phone no."
            name="phone"
            value={formData.phone}
            handleChange={handleChange}
            margin="dense"
            type="text"
            sm={6}
            required
          />
          <TextInput
            label="Address"
            name="address"
            value={formData?.address}
            handleChange={handleChange}
            margin="dense"
            type="text"
            required
          />
          <TextInput
            label="Locality"
            name="locality"
            value={formData?.locality}
            handleChange={handleChange}
            margin="dense"
            sm={6}
            required
          />
          <TextInput
            label="Pin code"
            name="pincode"
            value={formData?.pincode}
            handleChange={handleChange}
            margin="dense"
            sm={6}
            required
          />
          <TextInput
            label="City"
            name="city"
            value={formData?.city}
            handleChange={handleChange}
            margin="dense"
            sm={6}
            required
          />
          <TextInput
            label="State"
            name="state"
            value={formData?.state}
            handleChange={handleChange}
            margin="dense"
            sm={6}
            required
          />

          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                onClick={() => setIsEdit(false)}
                variant="text"
                size="small"
              >
                cancel
              </Button>
              <Box p={1} />
              <Button
                variant="contained"
                color="primary"
                onClick={onSave}
                size="small"
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Box flex={1} className={classes.content}>
        <Typography variant="body1">
          <b>{address.name}</b>
        </Typography>
        <Typography>{address.phone}</Typography>
        <Typography>{address.address}</Typography>
        <Typography>
          {address.locality}, {address.pincode}{" "}
        </Typography>
        <Typography>
          {address.city}, {address.state}
        </Typography>
      </Box>
      <Box className={classes.actions}>
        <IconButton onClick={() => setIsEdit(true)} size="small">
          <EditIcon color="primary" />
        </IconButton>
        <IconButton onClick={onDelete} size="small">
          <DeleteIcon color="secondary" />
        </IconButton>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2, 1, 1),
    display: "flex",
    flex: 1,
  },
  content: {},
  actions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    fontSize: theme.typography.fontSize * 0.8,
  },
  remove: {
    padding: 0,
    position: "absolute",
    top: "-0.5rem",
    right: "-0.5rem",
  },
}));

export default AddressForm;
