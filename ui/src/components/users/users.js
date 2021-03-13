import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
// import moment from 'moment';
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Container,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/actions/user";
import UserFilter from "../filter/user-filter";
import { getInitials, getName } from "../../utils";
// import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: "auto",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const Results = () => {
  const classes = useStyles();

  const users = useSelector((state) => state.user.users);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    const run = async () => {
      await dispatch(getUsers({}));
    };
    run();
  }, []);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = users.map((user) => user.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container maxWidth={false}>
      <UserFilter />
      <Box mt={3}>
        <Card className={classes.root}>
          <PerfectScrollbar>
            <Box minWidth={1050}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomerIds.length === users.length}
                        color="primary"
                        indeterminate={
                          selectedCustomerIds.length > 0 &&
                          selectedCustomerIds.length < users.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Orders</TableCell>
                    <TableCell>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.slice(0, limit).map((user) => (
                    <TableRow
                      hover
                      key={user.id}
                      selected={selectedCustomerIds.indexOf(user.id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedCustomerIds.indexOf(user.id) !== -1}
                          onChange={(event) => handleSelectOne(event, user.id)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Avatar className={classes.avatar} src={user.avatar}>
                            {getInitials(user)}
                          </Avatar>
                          <Typography color="textPrimary" variant="body1">
                            {getName(user)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone || "NA"}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          color="primary"
                          variant="contained"
                        >
                          See orders
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          color="primary"
                          variant="contained"
                        >
                          {user.role}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
          <TablePagination
            component="div"
            count={users.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Card>
      </Box>
    </Container>
  );
};

// Results.propTypes = {
// 	className: PropTypes.string,
// 	users: PropTypes.array.isRequired
// };

export default Results;
