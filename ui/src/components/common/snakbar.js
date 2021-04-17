import React from "react";

import MuiSnackbar from "@material-ui/core/Snackbar";

import { useDispatch, useSelector } from "react-redux";
import { resetSnackbar } from "../../store/actions/app";
import { makeStyles, SnackbarContent } from "@material-ui/core";

export default function AlertDialog() {
  const classes = useStyles();
  const open = useSelector((state) => state.app.openSnackbar);
  const snackbar = useSelector((state) => state.app.snackbar);

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(resetSnackbar());
  };

  return (
    <MuiSnackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <SnackbarContent
        message={snackbar.message}
        className={classes[snackbar.type]}
      />
    </MuiSnackbar>
  );
}

const useStyles = makeStyles((theme) => ({
  // info: {
  //   backgroundColor: theme.palette.info.light,
  //   color: theme.palette.info.contrastText,
  // },
  success: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.contrastText,
  },
  error: {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.contrastText,
  },
  warning: {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.contrastText,
  },
}));
