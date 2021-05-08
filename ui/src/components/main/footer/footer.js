import React from "react";
import { Link } from "react-router-dom";
import { Box, makeStyles, Typography, Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import { isUser } from "../../../utils";

export default function Footer() {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.currentUser);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <div className={classes.content}>
          <Box p={2}>
            <Box className={classes.logoBox}>
              <Typography className={classes.title}>FIBI</Typography>
              <Typography className={classes.subtitle}>MARKET</Typography>
            </Box>
          </Box>
          <Box p={2}>
            <Typography variant="button" color="textSecondary">
              <b>About</b>
            </Typography>
            <Box p={0.5} />
            <Typography>Contact us</Typography>
            <Typography>About us</Typography>
            <Typography>Privacy policies</Typography>
            <Typography>Terms of use</Typography>
          </Box>
          <Box p={2}>
            <Typography variant="button" color="textSecondary">
              <b>Useful links</b>
            </Typography>
            <Box p={0.5} />
            {!user ? (
              <Typography component={Link} to="/auth/signin">
                Login
              </Typography>
            ) : isUser(user) ? (
              <Typography component={Link} to="#">
                Sell on FIBI
              </Typography>
            ) : (
              <Typography component={Link} to="/dashboard">
                Dashboard
              </Typography>
            )}
          </Box>
          <Box p={2}>
            <Typography>
              Pimpari chinchwad, 412303, Pune, Maharashtra, India
            </Typography>
          </Box>
        </div>
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  content: {
    display: "flex",
    flex: "1",
    flexWrap: "wrap",
    "& > div": {
      flex: "1",
    },
  },
  logoBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "70%",
    height: "100%",
  },
  title: {
    fontSize: "3rem !important",
    fontFamily: "fantasy !important",
  },
  subtitle: {
    fontSize: "1.5rem !important",
    fontFamily: "fantasy !important",
    marginTop: -15,
  },
}));
