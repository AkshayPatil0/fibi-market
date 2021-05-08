import React, { useState } from "react";
import {
  Button,
  Typography,
  GridList,
  GridListTile,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  makeStyles,
  LinearProgress,
} from "@material-ui/core";

import { Cancel } from "@material-ui/icons";

const MultipleImagePicker = ({
  previews,
  onAdd,
  onRemove,
  previewElement,
  header,
}) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async (e) => {
    setIsLoading(true);
    try {
      await onAdd(e);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  const handleRemove = async (e) => {
    setIsLoading(true);
    try {
      await onRemove(e);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const defaultPreview = (
    <CardContent>
      {previews && previews.length > 0 ? (
        <GridList cellHeight={160} className={classes.gridList} cols={2}>
          {previews.map((img) => (
            <GridListTile key={img} cols={1}>
              <img className={classes.image} src={img} alt={img} />
              <IconButton
                className={classes.delete}
                onClick={() => handleRemove(img)}
              >
                <Cancel color="error" />
              </IconButton>
            </GridListTile>
          ))}
        </GridList>
      ) : (
        <Typography>No images selected !</Typography>
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
          Add images
          <input
            name="images"
            type="file"
            onChange={handleAdd}
            multiple
            hidden
          />
        </Button>
      </CardActions>

      {isLoading && <LinearProgress />}
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  image: {
    objectFit: "contain",
    height: "100%",
  },
  delete: {
    position: "absolute",
    right: theme.spacing(0.2),
    top: theme.spacing(0.2),
    backgroundColor: "#fff",
    padding: 0,
  },
}));

export default MultipleImagePicker;
