import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { Refresh } from "@material-ui/icons";
import { Search as SearchIcon } from "react-feather";

import ToolbarLayout from "../toolbar-layout";
import ProductDetailsForm from "./forms/product-details-form";
import { getProducts, newProduct } from "../../../store/actions/product";
import { isVendor } from "../../../utils";

const ProductToolbar = () => {
  const classes = useStyles();

  const user = useSelector((state) => state.auth.currentUser);
  const [open, setOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();

  const router = useHistory();

  const onSuccess = (id) => {
    router.push(`/dashboard/products/update/${id}`);
  };
  const onCreate = async () => {
    await dispatch(newProduct(onSuccess));
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    await dispatch(
      getProducts({ vendor: isVendor(user) ? user.id : undefined })
    );
    setIsRefreshing(false);
  };

  return (
    <ToolbarLayout>
      <TextField
        margin="dense"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SvgIcon fontSize="small" color="action">
                <SearchIcon />
              </SvgIcon>
            </InputAdornment>
          ),
        }}
        placeholder="Search product"
        variant="outlined"
      />
      <Box display="flex" alignItems="center">
        {isRefreshing ? (
          <Box display="flex" alignItems="center" pr={2}>
            <CircularProgress
              className={classes.button}
              size="2rem"
              thickness={5}
            />
          </Box>
        ) : (
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={onRefresh}
          >
            <Refresh />
          </Button>
        )}
        {isVendor(user) && (
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Add product
          </Button>
        )}
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className={classes.modal}>
          <ProductDetailsForm
            header="Create product"
            action={
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={onCreate}
              >
                Continue
              </Button>
            }
          />
        </div>
      </Modal>
    </ToolbarLayout>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},

  modal: {
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
    position: "absolute",
  },

  button: {
    margin: theme.spacing(0, 1),
  },
}));

export default ProductToolbar;
