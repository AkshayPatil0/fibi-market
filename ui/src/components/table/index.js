import React, { useEffect, useState } from "react";
// import moment from 'moment';
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  Checkbox,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getUsers } from "../../../store/actions/user";

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: "auto",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const Table = ({ rows, options }) => {
  const classes = useStyles();

  const [selectedIds, setSelectedIds] = useState([]);
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
    let newSelectedIds;

    if (event.target.checked) {
      newSelectedIds = rows.map((user) => user.id);
    } else {
      newSelectedIds = [];
    }

    setSelectedIds(newSelectedIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedIds.indexOf(id);
    let newSelectedIds = [];

    if (selectedIndex === -1) {
      newSelectedIds = newSelectedIds.concat(selectedIds, id);
    } else if (selectedIndex === 0) {
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(1));
    } else if (selectedIndex === selectedIds.length - 1) {
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedIds = newSelectedIds.concat(
        selectedIds.slice(0, selectedIndex),
        selectedIds.slice(selectedIndex + 1)
      );
    }

    setSelectedIds(newSelectedIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={classes.root}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <MuiTable>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedIds.length === rows.length}
                    color="primary"
                    indeterminate={
                      selectedIds.length > 0 && selectedIds.length < rows.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                {options.map((opt) => (
                  <TableCell key={opt.key}>{opt.head}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(0, limit).map((row) => (
                <TableRow
                  hover
                  key={row.id}
                  selected={selectedIds.indexOf(row.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedIds.indexOf(row.id) !== -1}
                      onChange={(event) => handleSelectOne(event, row.id)}
                      value="true"
                    />
                  </TableCell>

                  {options.map((opt) => (
                    <TableCell key={opt.key}>{row[opt.key]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={rows.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

// Results.propTypes = {
// 	className: PropTypes.string,
// 	rows: PropTypes.array.isRequired
// };

export default Table;
