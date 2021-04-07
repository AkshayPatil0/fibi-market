import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  ListItem,
  ListItemText,
  Collapse,
  Typography,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, Delete } from "@material-ui/icons";

import { deleteLocation } from "../../../store/actions/product";
import LocationList from "./location-list";

function LocationItem({ location }) {
  const [showChildren, setShowChildren] = useState(false);

  const dispatch = useDispatch();
  return (
    <>
      <ListItem button onClick={() => setShowChildren(!showChildren)}>
        {showChildren ? <ExpandLess /> : <ExpandMore />}
        <ListItemText
          primary={<Typography variant="h6">{location.title}</Typography>}
        ></ListItemText>
        <Delete
          color="error"
          onClick={() => dispatch(deleteLocation(location.id))}
        />
      </ListItem>
      <Collapse in={showChildren} timeout="auto" unmountOnExit>
        <LocationList locations={location.childrens} parent={location} />
      </Collapse>
    </>
  );
}

export default LocationItem;
