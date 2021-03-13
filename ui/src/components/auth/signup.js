import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import {
  Avatar,
  Button,
  CssBaseline,
  Select,
  MenuItem,
  Link,
  Grid,
  Typography,
  Container,
  InputLabel,
  FormControl,
} from "@material-ui/core";

import { LockOutlined } from "@material-ui/icons";
import Input from "../common/input";
import { useStyles } from "./styles";
import { useDispatch } from "react-redux";
import { signup } from "../../store/actions/auth";

export default function SignUp() {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cpassword: "",
    role: "",
  });
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    global: "",
  });
  const [passwordMatched, setPasswordMatched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useHistory();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (formData.password !== formData.cpassword) {
      setPasswordMatched(false);
    } else {
      setPasswordMatched(true);
    }
  }, [formData.cpassword, formData.password]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(signup(formData));
      router.push("/");
    } catch (err) {
      let newError = {};
      err.response.data.errors.map((err) => {
        if (err.field) {
          newError[err.field] = err.message;
        } else {
          newError.global = err.message;
        }
      });
      setError(newError);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Typography variant="caption" color="error">
          {error.global}
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={1}>
            <Input
              name="firstName"
              label="First name"
              type="text"
              sm={6}
              value={formData.firstName}
              handleChange={handleChange}
              autoFocus
              error={error.firstName}
            />
            <Input
              name="lastName"
              label="Last name"
              type="text"
              sm={6}
              value={formData.lastName}
              handleChange={handleChange}
            />
            <Input
              name="email"
              label="Email address"
              type="email"
              value={formData.email}
              handleChange={handleChange}
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
            <Input
              name="cpassword"
              label="Confirm Password"
              type="password"
              value={formData.cpassword}
              handleChange={handleChange}
              error={
                !passwordMatched && formData.cpassword
                  ? "Password dosen't match"
                  : ""
              }
            />
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
                margin="dense"
              >
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  variant="outlined"
                  label="Role"
                  margin="dense"
                  // input={<BootstrapInput />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                  <MenuItem value={"vendor"}>Vendor</MenuItem>
                  <MenuItem value={"user"}>User</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container spacing={3}>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/auth/signin" variant="body2">
                  {"have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
