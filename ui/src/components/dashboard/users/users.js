import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Container,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../store/actions/user";
import UserFilter from "../filter/user-filter";
import { getInitials, getName } from "../../../utils";
import Table from "../../common/table";

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
    { head: "Orders", key: "orders" },
    { head: "Role", key: "role" },
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
      row.orders = (
        <Button size="small" color="primary" variant="contained">
          See orders
        </Button>
      );
      row.role = (
        <Button size="small" color="primary" variant="contained">
          {user.role}
        </Button>
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

export default Users;
