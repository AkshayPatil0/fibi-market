import React, { useState } from "react";
import {
  Typography,
  ListItem,
  ListItemText,
  Collapse,
  makeStyles,
  IconButton,
  Chip,
  Box,
} from "@material-ui/core";
import { Cancel, ExpandLess, ExpandMore } from "@material-ui/icons";

import Input from "../../../common/input";

const ProductVariationForm = ({
  setVariation,
  name,
  variation,
  removeVariation,
}) => {
  const classes = useStyles();

  const [newValue, setNewValue] = useState("");
  const [showChildren, setShowChildren] = useState(false);

  const onAddNewValue = (e) => {
    e.preventDefault();
    setVariation(name, newValue);
    setNewValue("");
  };

  return (
    <div className={classes.root}>
      <ListItem
        button
        onClick={() => setShowChildren(!showChildren)}
        className={classes.listItem}
      >
        {showChildren ? <ExpandLess /> : <ExpandMore />}
        <ListItemText primary={name}></ListItemText>
        <IconButton onClick={removeVariation} className={classes.remove}>
          <Cancel color="error" />
        </IconButton>
      </ListItem>
      <Collapse in={showChildren} timeout="auto" unmountOnExit>
        {variation && variation.length > 0
          ? variation.map((value) => (
              // <ListItem key={value}>
              //   <ListItemText>
              //     <Typography variant="body2">{value}</Typography>
              //   </ListItemText>
              // </ListItem>
              <Box p={1} fontSize={12}>
                <Chip size="small" label={value} onDelete={() => {}} />
              </Box>
            ))
          : null}
        <ListItem>
          <form onSubmit={onAddNewValue}>
            <Input
              type="text"
              placeholder={`Add new ${name}..`}
              value={newValue}
              handleChange={(e) => setNewValue(e.target.value)}
              margin="dense"
              size="small"
              smaller
            />
          </form>
        </ListItem>
      </Collapse>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid lightgrey",
    borderRadius: "0.25rem",
    margin: theme.spacing(1),
  },
  listItem: {
    padding: theme.spacing(1),
  },
  remove: {
    padding: 0,
    height: "100%",
  },
}));

export default ProductVariationForm;
