import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Container,
  makeStyles,
  Button,
  IconButton,
  Menu,
  List,
  ListItem,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, setRole } from "../../../store/actions/user";
import UserFilter from "./user-filter";
import { getInitials, getName } from "../../../utils";
import Table from "../../common/table";
import { Person, ShoppingCart } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: "auto",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const Users = () => {
  const classes = useStyles();

  const users = useSelector((state) => state.user.users);
  const [rows, setRows] = useState([]);

  const options = [
    { head: "Name", key: "name" },
    { head: "Email", key: "email" },
    { head: "Phone", key: "phone" },
    // { head: "Orders", key: "orders" },
    { head: "Role", key: "role" },
    { head: "Actions", key: "actions" },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    let newRows = [];
    users.forEach((user) => {
      let row = {};

      row.name = (
        <Box alignItems="center" display="flex">
          <Avatar className={classes.avatar} src={user.avatar}>
            {getInitials(user)}
          </Avatar>
          <Typography color="textPrimary" variant="body1">
            {getName(user)}
          </Typography>
        </Box>
      );

      row.email = <Typography>{user.email}</Typography>;
      row.phone = <Typography>{user.phone || "NA"}</Typography>;
      row.role = <Typography>{user.role}</Typography>;

      row.actions = (
        <>
          <IconButton size="small">
            <ShoppingCart color="primary" />
          </IconButton>
          <SetRoleMenu user={user} />
        </>
      );

      newRows.push(row);
    });
    console.log({ newRows, users });
    setRows(newRows);
  }, [users, classes.avatar]);

  useEffect(() => {
    const run = async () => {
      await dispatch(getUsers({}));
    };
    run();
  }, [dispatch]);

  return (
    <Container maxWidth={false}>
      <UserFilter />
      <Box mt={3}>
        <Table options={options} rows={rows} />
      </Box>
    </Container>
  );
};

const SetRoleMenu = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const userRoles = ["admin", "vendor", "user"];

  const onSetRole = (role) => {
    console.log(user);
    dispatch(setRole(user.id, role, user.email));
  };
  return (
    <>
      <IconButton
        size="small"
        edge="end"
        aria-label="set role to user"
        aria-haspopup="true"
        color="inherit"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <Person color="secondary" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        transformOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        // keepMounted
        onClick={handleCloseMenu}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <Box display="flex" flexDirection="column" px={2}>
          {userRoles.map((role) => (
            <Button size="small" onClick={() => onSetRole(role)}>
              {role}
            </Button>
          ))}
        </Box>
      </Menu>
    </>
  );
};

export default Users;
