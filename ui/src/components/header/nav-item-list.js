import React from "react";
import { Box, List } from "@material-ui/core";
import NavItem from "./nav-item";

import { Input as InputIcon } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { useMenuItems } from "./menu-items-hook";

const NavItemList = () => {
  const dispatch = useDispatch();

  const onSignout = async () => {
    try {
      await dispatch(signout());
    } catch (err) {
      console.error(err);
    }
  };

  const items = useMenuItems();
  return (
    <>
      <Box px={2}>
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
      </Box>
      <Box flexGrow={1} />
      <Box px={2}>
        <List>
          <NavItem onClick={onSignout} title="Signout" icon={InputIcon} />
        </List>
      </Box>
    </>
  );
};

export default NavItemList;
