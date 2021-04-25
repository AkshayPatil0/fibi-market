import React from "react";
import {
  Avatar,
  Box,
  CardContent,
  Typography,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import ProfileDetails from "./profile-details";
import { useDispatch, useSelector } from "react-redux";

import * as api from "../../../api";
import { getProfile } from "../../../store/actions/auth";
import ImagePicker from "../../common/image-picker";

const Profile = () => {
  const classes = useStyles();

  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const uploadAvatar = async (e) => {
    const fData = new FormData();
    fData.set("avatar", e.target.files[0]);
    await api.updateProfileAvatar(fData);
    await dispatch(getProfile());
  };

  const avatarPreview = (
    <CardContent>
      <Box alignItems="center" display="flex" flexDirection="column">
        <Avatar className={classes.avatar} src={user.avatar}>
          {user.firstName.charAt(0)}
        </Avatar>
        <Typography color="textPrimary" gutterBottom variant="h5">
          {user.firstName + " " + user.lastName}
        </Typography>
        <Typography color="textSecondary" variant="body1">
          {user.email}
        </Typography>
      </Box>
    </CardContent>
  );
  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item lg={4} md={6} xs={12}>
            <ImagePicker
              addImage={uploadAvatar}
              previewElement={avatarPreview}
            />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    // minHeight: '100%',
    // paddingBottom: theme.spacing(3),
    // paddingTop: theme.spacing(3),
  },
  avatar: {
    height: 100,
    width: 100,
  },
}));

export default Profile;
