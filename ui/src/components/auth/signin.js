import React, { useState } from "react";
import { useHistory } from "react-router";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import Input from "../common/input";
import GoogleLoginButton from "./google-login";
import { useDispatch } from "react-redux";

import { useStyles } from "./styles";
import { signin } from "../../store/actions/auth";
import { Box } from "@material-ui/core";

export default function SignIn() {
  const classes = useStyles();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ email: "", password: "", global: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const router = useHistory();
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(signin(formData));
      router.push("/");
    } catch (err) {
      let newError = {};
      err.response?.data?.errors
        ? err.response.data.errors.forEach((err) => {
            if (err.field) {
              newError[err.field] = err.message;
            } else {
              newError.global = err.message;
            }
          })
        : (newError.global = "Something went wrong !");
      setError(newError);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Box
          pb={3}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Typography variant="caption" color="error">
            {error.global}
          </Typography>
        </Box>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Input
              name="email"
              label="Email address"
              type="email"
              value={formData.email}
              handleChange={handleChange}
              autoFocus
              error={error.email}
            />
            <Input
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              handleChange={handleChange}
              handleShowPassword={() => setShowPassword(!showPassword)}
              error={error.password}
            />
          </Grid>
          <Box py={1.5} />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12}>
              <GoogleLoginButton />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between" pt={1}>
            <Typography
              onClick={() => router.push("")}
              color="primary"
              variant="body2"
              style={{ cursor: "pointer" }}
            >
              Forgot password?
            </Typography>
            <Typography
              onClick={() => router.push("/auth/signup")}
              variant="body2"
              color="primary"
              style={{ cursor: "pointer" }}
            >
              {"Don't have an account? Sign Up"}
            </Typography>
          </Box>
        </form>
      </div>
    </Container>
  );
}
