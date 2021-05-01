import React, { useState } from "react";
import {
  Button,
  Grid,
  // makeStyles
} from "@material-ui/core";

import TextInput from "../../common/input";

import { useProfileHook } from "./profile-hook";
import EditCardLayout from "../../common/edit-card-layout";

const ProfileDetails = () => {
  // const classes = useStyles();
  const { updateProfile, user } = useProfileHook();

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
          sm={6}
          value={formData.firstName}
          handleChange={handleChange}
          margin="dense"
        />
        <TextInput
          name="lastName"
          label="Last name"
          type="text"
          sm={6}
          value={formData.lastName}
          handleChange={handleChange}
          margin="dense"
        />
        <TextInput
          name="phone"
          label="Phone Number"
          type="text"
          sm={6}
          value={formData.phone}
          handleChange={handleChange}
          margin="dense"
        />
      </Grid>
      <Button color="primary" variant="text" fullWidth onClick={onSubmit}>
        Save details
      </Button>
    </EditCardLayout>
  );
};

export default ProfileDetails;
