import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  card: {
    fontSize: theme.spacing(1),
  },
}));

import TextInput from "../../common/input";

import { useProfileHook } from "./profile-hook";
import EditCardLayout from "../../common/edit-card-layout";

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const { updateProfile, user, deleteAvatar } = useProfileHook();

  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    role: user?.role,
    avatar: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await updateProfile(formData);
  };

  return (
    <EditCardLayout header="Profile Details">
      <Grid container spacing={1}>
        <TextInput
          name="firstName"
          label="First name"
          type="text"
          margin="normal"
          sm={6}
          value={formData.firstName}
          handleChange={handleChange}
          margin="dense"
        />
        <TextInput
          name="lastName"
          label="Last name"
          type="text"
          margin="normal"
          sm={6}
          value={formData.lastName}
          handleChange={handleChange}
          margin="dense"
        />
        <TextInput
          name="phone"
          label="Phone Number"
          type="text"
          margin="normal"
          sm={6}
          value={formData.phone}
          handleChange={handleChange}
          margin="dense"
        />
      </Grid>
      <Button color="primary" variant="text" fullWidth>
        Save details
      </Button>
    </EditCardLayout>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
};

export default ProfileDetails;
