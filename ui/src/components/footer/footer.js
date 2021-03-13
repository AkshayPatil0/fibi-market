import React from "react";
import { Link } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../store/actions/auth";
import { useGoogleLogout } from "react-google-login";
const HeaderComponent = () => {
  const user = useSelector((state) => state.auth.currentUser);
  // const preventDefault = (event) => event.preventDefault();
  const preventDefault = (event) => {};

  const { signOut, loaded } = useGoogleLogout({
    clientId:
      "246767929126-2lb3hs7qu531bl5jt1hb427sgnni0dob.apps.googleusercontent.com",
    onLogoutSuccess: () => dispatch(signout()),
    onFailure: (err) => console.error(err),
    cookiePolicy: "single_host_origin",
  });

  const dispatch = useDispatch();

  const onSignout = () => {
    if (loaded) {
      signOut();
    } else {
      dispatch(signout());
    }
  };

  const authMenu = user ? (
    <>
      <Grid>
        <Button m={2} variant="text">
          <Link to="/profile" onClick={preventDefault}>
            {user.firstName}
          </Link>
        </Button>
      </Grid>

      <Grid>
        <Button m={2} variant="text" onClick={onSignout}>
          Signout
        </Button>
      </Grid>
    </>
  ) : (
    <>
      <Grid>
        <Link to="/auth/signin" onClick={preventDefault}>
          <Button m={2} variant="text">
            Signin
          </Button>
        </Link>
      </Grid>

      <Grid>
        <Link to="/auth/signup" onClick={preventDefault}>
          <Button m={2} variant="text">
            Signup
          </Button>
        </Link>
      </Grid>
    </>
  );

  return (
    <Grid container>
      <Grid>
        <Link to="/" onClick={preventDefault}>
          <Button m={2} variant="text">
            FIBI
          </Button>
        </Link>
      </Grid>
      <Grid>
        <Link to="/products" onClick={preventDefault}>
          <Button m={2} variant="text">
            Products
          </Button>
        </Link>
      </Grid>

      <Grid>
        <Link to="/cart" onClick={preventDefault}>
          <Button m={2} variant="text">
            Cart
          </Button>
        </Link>
      </Grid>

      <Grid>
        <Link to="/orders" onClick={preventDefault}>
          <Button m={2} variant="text">
            Orders
          </Button>
        </Link>
      </Grid>
      {authMenu}
    </Grid>
  );
};

export default HeaderComponent;
