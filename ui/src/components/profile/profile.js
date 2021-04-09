import React from "react";
import {
  Box,
  Grid,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import ProfileDetails from "./profile-details";
import Addresses from "./addresses";
import MyAvatar from "./my-avatar";

const Profile = () => {
  const classes = useStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={isMobile ? 0 : 2}>
        <Grid item xs={12} md={4}>
          <Box width="100%" mb={2}>
            <MyAvatar />
          </Box>
          <Grid item xs={12} className={classes.sectionDesktop}></Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box width={"100%"} mb={2}>
            <ProfileDetails />
          </Box>
          <Box width={"100%"} mb={2}>
            <Addresses />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(2),
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "unset",
    },
  },
}));

export default Profile;
