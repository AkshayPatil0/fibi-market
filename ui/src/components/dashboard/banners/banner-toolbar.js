import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Box, makeStyles } from "@material-ui/core";

import ToolbarLayout from "../toolbar-layout";

import { addBanner } from "../../../store/actions/product";
import BannerForm from "./banner-form";

export default function BannersToolbar() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = async (fData) => {
    dispatch(addBanner(fData));
    setOpen(false);
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
      <BannerForm open={open} setOpen={setOpen} onSubmit={onSubmit} />
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

  card: {
    overflow: "visible",
  },
}));
