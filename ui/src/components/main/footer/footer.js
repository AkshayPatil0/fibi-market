import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  makeStyles,
  Typography,
  Container,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { isUser } from "../../../utils";

export default function Footer() {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.currentUser);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <div className={classes.content}>
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
            <Typography component={Link} to="/dashboard">
              {isUser(user) ? "Sell on FIBI" : "Dashboard"}
            </Typography>
          </Box>
          <Box p={2}>
            <Typography>Contact us</Typography>
            <Typography>About us</Typography>
            <Typography>Privacy policies</Typography>
          </Box>
          <Box p={2}>
            <Typography>
              Flipkart Internet Private Limited, Buildings Alyssa, Begonia &
              Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahalli
              Village, Bengaluru, 560103, Karnataka, India
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
}));
