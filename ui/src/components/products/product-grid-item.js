import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  makeStyles,
  IconButton,
} from "@material-ui/core";
// import { useProductHook } from "./product-hook";
import { useHistory } from "react-router";

import defaultImg from "../../assets/images/image.png";
import { Favorite } from "@material-ui/icons";
import Pricing from "../common/pricing";

function ProductGridItem({ product }) {
  // const { addToCart, deleteProduct } = useProductHook();

  const classes = useStyles();

  const router = useHistory();

  const [isWishlisted, setIsWishlisted] = useState(false);

  const onWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        onClick={() => router.push(`/products/${product.id}`)}
        children={
          product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className={classes.image}
            />
          ) : (
            <img
              src={defaultImg}
              alt={product.title}
              className={classes.image}
            />
          )
        }
        title={product.title}
      />
      <CardContent>
        <div className={classes.details}>
          <Typography component="h6" variant="body1">
            {product.title}
          </Typography>
          <Pricing {...product.price} small />
          <Box flex="1" />
        </div>
      </CardContent>
      <IconButton
        size="small"
        className={classes.wishlistButton}
        onClick={onWishlist}
      >
        {isWishlisted ? <Favorite color="secondary" /> : <Favorite />}
      </IconButton>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  details: {},
  imageDiv: {
    height: theme.spacing(20),
    overflow: "hidden",
    cursor: "pointer",
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
  wishlistButton: {
    height: 30,
    width: 30,
    borderRadius: "50%",
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "&:hover, &:focus": {
      backgroundColor: "#fff",
    },
  },
}));

export default ProductGridItem;
