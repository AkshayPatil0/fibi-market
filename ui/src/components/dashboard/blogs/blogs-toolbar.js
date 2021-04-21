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
import { Refresh } from "@material-ui/icons";
import { Search as SearchIcon } from "react-feather";

import ToolbarLayout from "../toolbar-layout";

import { getBlogs } from "../../../store/actions/blog";

export default function BlogsToolbar() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();

  const router = useHistory();

  const onRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    await dispatch(getBlogs());
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
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          onClick={() => router.push(`${router.location.pathname}/new`)}
        >
          Add new blog
        </Button>
      </Box>
    </ToolbarLayout>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},

  button: {
    margin: theme.spacing(0, 1),
  },
}));
