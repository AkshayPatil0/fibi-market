import React, { useState } from "react";
import {
  Button,
  Grid,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  makeStyles,
  Divider,
} from "@material-ui/core";
import Slider from "react-slick";
import { useProductHook } from "./product-hook";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { isAdmin, isVendor } from "../../utils";

import defaultImg from "../../assets/images/image.png";

function Product({ product }) {
  const { addToCart, deleteProduct } = useProductHook();

  const [quantity, setQuantity] = useState(1);

  const classes = useStyles();

  const user = useSelector((state) => state.auth.currentUser);

  const router = useHistory();
  const handleChange = (e) => {
    if (e.target.value > 0) {
      setQuantity(e.target.value);
    } else {
      setQuantity("");
    }
  };

  const cartActions = (
    <div className={classes.actions}>
      {isAdmin(user) || isVendor(user) ? (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              router.push(`/dashboard/products/update/${product.id}`)
            }
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => deleteProduct(product.id)}
          >
            Delete
          </Button>
        </>
      ) : (
        <Button
          variant={"contained"}
          onClick={() => addToCart(product.id, quantity)}
        >
          Add to cart
        </Button>
      )}
    </div>
  );

  const carousel = (
    <Slider
      dots
      infinite={false}
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      lazyLoad
    >
      {product.images && product.images.length > 0 ? (
        product.images.map((url) => (
          <div className={classes.imageDiv} key={url}>
            <img src={url} className={classes.image} />
          </div>
        ))
      ) : (
        <div className={classes.imageDiv}>
          <img src={defaultImg} className={classes.image} />
        </div>
      )}
    </Slider>
  );

  return (
    <Card>
      <CardMedia children={carousel} title={product.title} />
      <CardContent>
        <div className={classes.details}>
          <Typography component="h6" variant="body1">
            {product.title}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {`₹ ${product.price}`}
          </Typography>
          <Box flex="1" />
          <Typography
            component="p"
            variant="subtitle2"
            color="textSecondary"
            className={classes.quantityText}
          >
            {`stock - ${product.stock}`}
          </Typography>
        </div>
      </CardContent>
      {/* <Divider /> */}
      {cartActions}
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},
  details: {},
  imageDiv: {
    height: theme.spacing(30),
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
  actions: {
    display: "flex",
    width: "100%",
    "& button": {
      flex: "1",
      margin: theme.spacing(1),
    },
  },
}));

export default Product;
