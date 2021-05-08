import React, { useEffect } from "react";

import { Box, makeStyles, Paper } from "@material-ui/core";

import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { getBanners } from "../../../../store/actions/product";
import { useHistory } from "react-router";

export default function Banners() {
  const classes = useStyles();

  const banners = useSelector((state) => state.product.banners);
  const dispatch = useDispatch();
  const router = useHistory();

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  const handleClick = (banner) => {
    if (banner.category) {
      router.push(`/categories/${banner.category}`);
    } else if (banner.location) {
      router.push(`/location/${banner.location}`);
    }
  };

  if (!banners || banners.length < 1) {
    return <div />;
  }

  return (
    <Box p={1}>
      <Slider slidesPerRow={1} arrows={false} dots infinite>
        {banners.map((banner) => (
          <Box
            key={banner.cover}
            className={classes.banner}
            onClick={() => handleClick(banner)}
          >
            <img
              src={banner.cover}
              alt={banner.title || "banner"}
              height="100%"
              width="100%"
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  banner: {
    maxHeight: 300,
    margin: theme.spacing(1),
    cursor: "pointer",
  },
}));
