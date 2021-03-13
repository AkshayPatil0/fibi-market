import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  Container,
  Grid,
  makeStyles,
  LinearProgress
} from '@material-ui/core';
import ProfileDetails from "./profile-details";
import { useDispatch, useSelector } from "react-redux";

import * as api from '../../api';
import { getProfile } from "../../store/actions/auth";

const Profile = () => {
  const classes = useStyles();

  const user = useSelector(state => state.auth.currentUser)

  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch();

  const uploadAvatar = async (e) => {
    if (e.target.files.length < 1) return

    const fData = new FormData();
    fData.set('avatar', e.target.files[0])
    setIsLoading(true)
    try {
      await api.updateProfileAvatar(fData)
      await new Promise((resolve) => {
        setTimeout(() => resolve(), 2000)
      })
      await dispatch(getProfile());

    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false)
    }

  }
  return (
    <div className={classes.root} >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Card>
              <CardContent>
                <Box
                  alignItems="center"
                  display="flex"
                  flexDirection="column"
                >
                  <Avatar
                    className={classes.avatar}
                    src={user.avatar}
                  >
                    {user.firstName.charAt(0)}
                  </Avatar>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                  >
                    {user.firstName + ' ' + user.lastName}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    {user.email}
                  </Typography>
                  <Typography
                    className={classes.dateText}
                    color="textSecondary"
                    variant="body1"
                  >
                    {/* {`${moment().format('hh:mm A')} ${user.timezone}`} */}
                  </Typography>
                </Box>
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  color="primary"
                  fullWidth
                  variant="text"
                  component="label"
                >
                  Upload picture
                  <input type="file" hidden onChange={uploadAvatar} />
                </Button>
              </CardActions>
              {isLoading && <LinearProgress />}
            </Card>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
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
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  avatar: {
    height: 100,
    width: 100,
  }
}));

export default Profile;