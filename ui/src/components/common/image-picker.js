import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  makeStyles,
  LinearProgress,
  CardContent,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

export default function ImagePicker({
  preview,
  addImage,
  removeImage,
  previewElement,
  header,
  buttonText,
}) {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  const [isHover, setIsHover] = useState(false);

  const onAdd = async (e) => {
    if (e.target.files.length < 1) return;
    setIsLoading(true);
    try {
      await addImage(e);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onRemove = async () => {
    setIsLoading(true);
    try {
      await removeImage();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const defaultPreview = (
    <CardContent className={classes.preview}>
      {preview ? (
        <>
          {isHover && (
            <IconButton
              className={classes.removeButton}
              onMouseEnter={() => setIsHover(true)}
              onClick={onRemove}
            >
              <Delete color="error" />
            </IconButton>
          )}
          <img
            src={preview}
            alt="preview"
            className={classes.image}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          />
        </>
      ) : (
        <Typography>No image selected !</Typography>
      )}
    </CardContent>
  );

  return (
    <Card>
      {header && (
        <>
          <CardHeader title={header} />
          <Divider />
        </>
      )}
      {previewElement || defaultPreview}
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text" component="label">
          {buttonText || "Upload image"}
          <input type="file" hidden onChange={onAdd} />
        </Button>
      </CardActions>
      {isLoading && <LinearProgress />}
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
  preview: {
    position: "relative",
  },
  removeButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgb(255 255 255 / 50%)",
    "&:hover": {
      backgroundColor: "white",
    },
  },
}));
