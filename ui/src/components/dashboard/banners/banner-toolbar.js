import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Button,
  TextField,
  InputAdornment,
  SvgIcon,
  Box,
  makeStyles,
  Modal,
  CircularProgress,
} from "@material-ui/core";

import ToolbarLayout from "../toolbar-layout";

import ImagePicker from "../../common/image-picker";

import * as api from "../../../api";
import { getImageFormData } from "../../../utils";

export default function BannersToolbar() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const router = useHistory();

  const addBanner = async (e) => {
    const res = await api.addBanner(
      getImageFormData(e.target.files[0], "cover")
    );
    setOpen(false);
    // dispatch(setBlog(res.data));
  };

  return (
    <ToolbarLayout>
      <Box></Box>
      <Box display="flex" alignItems="center">
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Add new banner
        </Button>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className={classes.modal}>
          <ImagePicker
            buttonText="Select banner cover"
            addImage={addBanner}
            preview
          />
        </div>
      </Modal>
    </ToolbarLayout>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},

  button: {
    margin: theme.spacing(0, 1),
  },

  modal: {
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
    position: "absolute",
  },
}));
