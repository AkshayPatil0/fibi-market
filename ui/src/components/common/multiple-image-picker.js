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

const MultipleImagePicker = ({ previews, onAdd, onRemove }) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async (e) => {
    setIsLoading(true);
    await onAdd(e);
    setIsLoading(false);
  };
  const handleRemove = async (e) => {
    setIsLoading(true);
    await onRemove(e);
    setIsLoading(false);
  };
  return (
    <Card>
      <CardHeader title="Images" titleTypographyProps={{ variant: "h6" }} />
      <Divider />
      <CardContent className={classes.priceDetails}>
        {previews && previews.length > 0 ? (
          <GridList cellHeight={160} className={classes.gridList} cols={2}>
            {previews.map((img) => (
              <GridListTile key={img} cols={1}>
                <img src={img} alt={img} />
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
  delete: {
    position: "absolute",
    right: theme.spacing(0.2),
    top: theme.spacing(0.2),
    backgroundColor: "#fff",
    padding: 0,
  },
}));

export default MultipleImagePicker;
