import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    // width: 300,
  },
});

function valuetext(value) {
  return `Rs. ${value}`;
}

export default function PriceFilter() {
  const classes = useStyles();
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" variant="button" gutterBottom>
        Price
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        step={100}
        min={100}
        max={50000}
        getAriaValueText={valuetext}
      />
    </div>
  );
}
