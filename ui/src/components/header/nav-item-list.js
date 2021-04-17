import React from "react";
import { Box, List } from "@material-ui/core";
import NavItem from "./nav-item";

import { Input as InputIcon } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { useMenuItems } from "./menu-items-hook";
import { signout } from "../../store/actions/auth";
import { useGoogleLogout } from "react-google-login";

const NavItemList = () => {
  const dispatch = useDispatch();

  const { signOut, loaded } = useGoogleLogout({
    clientId:
      "246767929126-2lb3hs7qu531bl5jt1hb427sgnni0dob.apps.googleusercontent.com",
    onLogoutSuccess: () => dispatch(signout()),
    onFailure: (err) => console.error(err),
    cookiePolicy: "single_host_origin",
  });

  const onSignout = async () => {
    try {
      if (loaded) {
        await signOut();
      }
      await dispatch(signout());
    } catch (err) {
      console.error(err);
    }
  };

  const items = useMenuItems();
  return (
    <>
      <List>
        {items.map((item) => (
          <NavItem
            href={item.href}
            key={item.title}
            title={item.title}
            icon={item.icon}
          />
        ))}
      </List>
      <Box flexGrow={1} />
      <List>
        <NavItem onClick={onSignout} title="Signout" icon={InputIcon} />
      </List>
    </>
  );
};

export default NavItemList;
