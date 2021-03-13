import React, { useState } from "react";
import { Button } from "@material-ui/core";
import GoogleLogin from "react-google-login";

import Icon from "./google-icon";

import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { googleSignin } from "../../store/actions/auth";

const GoogleLoginButton = () => {
  const Router = useHistory();
  const dispatch = useDispatch();

  const onSuccess = async (res) => {
    await dispatch(googleSignin({ profile: res.profileObj }));
    Router.push("/");
  };

  const onFailure = (err) => {
    console.error(err);
  };

  return (
    <GoogleLogin
      clientId="246767929126-2lb3hs7qu531bl5jt1hb427sgnni0dob.apps.googleusercontent.com"
      render={(props) => (
        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<Icon />}
          onClick={props.onClick}
          disabled={props.disabled}
        >
          Sign in with google
        </Button>
      )}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy="single_host_origin"
    />
  );
};

export default GoogleLoginButton;
