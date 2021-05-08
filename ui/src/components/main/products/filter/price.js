import React, { useEffect } from "react";
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

  useEffect(() => {
    setFilter((filter) => ({
      ...filter,
      minPrice: 0,
      maxPrice: selectedCategory.maxPrice || 10000,
    }));
  }, []);

  return (
    <div className={classes.root}>
      <Typography id="range-slider" variant="h6" gutterBottom>
        <b>Price</b>
      </Typography>
      <Box px={2}>
        <Slider
          value={[+filter.minPrice, +filter.maxPrice]}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          step={selectedCategory.minPrice || 500}
          min={0}
          max={selectedCategory.maxPrice || 10000}
          getAriaValueText={valuetext}
          valueLabelFormat={valuetext}
        />
        <Box display="flex" justifyContent="space-between">
          <Typography>
            <b>{`Rs. ${filter.minPrice} `}</b>
          </Typography>
          <Typography>to</Typography>
          <Typography>
            <b>{`Rs. ${
              +filter.maxPrice === (+selectedCategory.maxPrice || 10000)
                ? filter.maxPrice + "+"
                : filter.maxPrice
            }`}</b>
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
