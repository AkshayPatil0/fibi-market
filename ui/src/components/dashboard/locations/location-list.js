import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { List, ListItem, ListItemText } from "@material-ui/core";

import TextInput from "../../common/input";
import { addLocation } from "../../../store/actions/product";
import LocationItem from "./location-item";

function LocationList({ locations, parent }) {
  const [location, setLocation] = useState("");

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();

    await dispatch(addLocation({ title: location, parent: parent?.id }));
    setLocation("");
  };

  return (
    <List component="nav" style={{ paddingLeft: "20px" }}>
      {locations.map((cat) => {
        return <LocationItem key={cat.id} location={cat} />;
      })}
      <ListItem>
        {/* <ListItemText
          primary={ */}
        <form onSubmit={onSubmit}>
          <TextInput
            type="text"
            name="location"
            placeholder={`Add location${
              parent ? ` in ${parent.title}` : ""
            }...`}
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
            margin="dense"
          />
        </form>
        {/* }
        ></ListItemText> */}
      </ListItem>
    </List>
  );
}

export default LocationList;
