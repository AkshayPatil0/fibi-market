import React from "react";
import { Button, Box, IconButton, makeStyles } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import ToolbarLayout from "./toolbar-layout";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../../store/actions/product";

const EditProductToolbar = () => {
  const classes = useStyles();

  const router = useHistory();
  const dispatch = useDispatch();
  return (
    <ToolbarLayout>
      <Box>
        <IconButton className={classes.back} onClick={() => router.goBack()}>
          <ArrowBack />
        </IconButton>
      </Box>
      <Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => dispatch(updateProduct())}
        >
          Save details
        </Button>
      </Box>
    </ToolbarLayout>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  back: {
    padding: theme.spacing(0.5),
  },
}));

export default EditProductToolbar;
