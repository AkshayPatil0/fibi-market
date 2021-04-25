import React, { useState } from "react";

import { Card, makeStyles, IconButton } from "@material-ui/core";

import { useDispatch } from "react-redux";
import { deleteBanner, updateBanner } from "../../../store/actions/product";
import { Delete, Edit } from "@material-ui/icons";
import BannerForm from "./banner-form";

export default function BannerCard({ banner }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = async (fData) => {
    dispatch(updateBanner(banner.id, fData));
    setOpen(false);
  };

  return (
    <>
      <Card className={classes.card}>
        <img src={banner.cover} alt={banner.title} width="100%" />
        <IconButton
          className={classes.editButton}
          size="small"
          onClick={() => setOpen(true)}
        >
          <Edit color="primary" />
        </IconButton>
        <IconButton
          className={classes.deleteButton}
          size="small"
          onClick={() => dispatch(deleteBanner(banner.id))}
        >
          <Delete color="error" />
        </IconButton>
      </Card>
      <BannerForm
        banner={banner}
        open={open}
        setOpen={setOpen}
        onSubmit={onSubmit}
      />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
  },
  editButton: {
    position: "absolute",
    top: "10px",
    right: "3em",

    backgroundColor: "white",
  },
  deleteButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "white",
  },
}));
