import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Typography,
  makeStyles,
  LinearProgress,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import * as api from "../../api";
import { getProfile } from "../../store/actions/auth";
import EditCardLayout from "../common/edit-card-layout";

const MyAvatar = () => {
  const classes = useStyles();

  const user = useSelector((state) => state.auth.currentUser);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const uploadAvatar = async (e) => {
    if (e.target.files.length < 1) return;

    const fData = new FormData();
    fData.set("avatar", e.target.files[0]);
    setIsLoading(true);
    try {
      await api.updateProfileAvatar(fData);
      await new Promise((resolve) => {
        setTimeout(() => resolve(), 2000);
      });
      await dispatch(getProfile());
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <EditCardLayout header="My avatar">
      <>
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
        {isLoading && <LinearProgress />}
      </>
      <Button color="primary" fullWidth variant="text" component="label">
        Upload picture
        <input type="file" hidden onChange={uploadAvatar} />
      </Button>
    </EditCardLayout>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.dark,
    // minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "unset",
    },
  },
  avatar: {
    height: 100,
    width: 100,
  },
}));

export default MyAvatar;
