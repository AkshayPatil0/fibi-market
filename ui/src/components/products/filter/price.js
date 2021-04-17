import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { Box } from "@material-ui/core";

export default function PriceFilter({ selectedCategory, filter, setFilter }) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setFilter((filter) => ({
      ...filter,
      minPrice: newValue[0],
      maxPrice: newValue[1],
    }));
  };

  function valuetext(value) {
    let n = value;
    if (value > 999) {
      n = value / 1000 + "k";
    }
    return `${n}${value === selectedCategory.maxPrice ? "+" : ""}`;
  }

  return (
    <div className={classes.root}>
      <Typography id="range-slider" variant="h6" gutterBottom>
        <b>Price</b>
      </Typography>
      <Box px={2}>
        <Slider
          value={[
            +filter.minPrice || selectedCategory.minPrice,
            +filter.maxPrice || selectedCategory.maxPrice,
          ]}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          step={selectedCategory.minPrice}
          min={0}
          max={selectedCategory.maxPrice}
          getAriaValueText={valuetext}
          valueLabelFormat={valuetext}
        />
        <Box display="flex" justifyContent="space-between">
          <Typography>
            <b>{`Rs. ${filter.minPrice || selectedCategory.minPrice} `}</b>
          </Typography>
          <Typography>to</Typography>
          <Typography>
            <b>{`Rs. ${filter.maxPrice || selectedCategory.maxPrice}`}</b>
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));
