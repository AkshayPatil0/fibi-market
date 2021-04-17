import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { resetAlert } from "../../store/actions/app";

export default function AlertDialog() {
  const open = useSelector((state) => state.app.openAlert);
  const alert = useSelector((state) => state.app.alert);

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(resetAlert());
  };

  const handleClick = (onClick) => {
    handleClose();
    onClick();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{alert.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {alert.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        {alert.actions.map((act) => (
          <Button onClick={() => handleClick(act.onClick)} color="primary">
            {act.title}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
}
