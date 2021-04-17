import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  makeStyles,
  Grid,
  Card,
  Typography,
  Breadcrumbs,
  CardHeader,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  CardContent,
} from "@material-ui/core";

import { NavLink as Link } from "react-router-dom";
import { setTheme } from "../../store/actions/app";

const themeOptions = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
];

export default function Settings() {
  const classes = useStyles();

  const theme = useSelector((state) => state.app.theme);

  const dispatch = useDispatch();

  const handleThemeChange = (e) => {
    dispatch(setTheme(e.target.value));
    localStorage.setItem("theme", e.target.value);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to="/">
              Home
            </Link>
            <Typography color="textPrimary">Settings</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Settings" />
            <Divider />
            <CardContent>
              <Typography>
                <b>Select theme</b>
              </Typography>
              <RadioGroup value={theme} onChange={handleThemeChange}>
                {themeOptions.map(({ label, value }) => (
                  <Box display="flex" px={2} alignItems="center" key={value}>
                    <FormControlLabel
                      value={value}
                      control={<Radio color="primary" />}
                    />
                    <Typography>{label}</Typography>
                  </Box>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
}));
