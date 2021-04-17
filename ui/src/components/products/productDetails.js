import React, { useEffect } from "react";

import {
  Container,
  Grid,
  LinearProgress,
  Typography,
  Box,
  makeStyles,
  Divider,
  Button,
} from "@material-ui/core";

import {
  FavoriteBorder,
  NavigateBefore,
  NavigateNext,
  ShoppingCart,
} from "@material-ui/icons";
import { useHistory, useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../store/actions/product";
import { addToCart } from "../../store/actions/order";
import Pricing from "../common/pricing";
import Slider from "react-slick";
import VariantsList from "./variantsList";
import { setAlert } from "../../store/actions/app";
import QueryString from "qs";
import { onWishlist } from "../../store/actions/auth";

const ProductDetails = () => {
  const classes = useStyles();
  const { id } = useParams();

  const product = useSelector((state) => state.product.product);
  const user = useSelector((state) => state.auth.currentUser);

  const router = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const run = async () => {
      try {
        await dispatch(getProduct(id));
      } catch (err) {
        console.error(err);
      }
    };
    run();
  }, [id, dispatch]);

  if (!product) {
    return <LinearProgress />;
  }
  const handleWishlist = () => {
    if (!user) {
      dispatch(
        setAlert(
          "Login required",
          "you need to login to add product to wishlist",
          [
            {
              title: "Login",
              onClick: () =>
                router.push(
                  `/auth/signin?${QueryString.stringify({
                    redirectUrl: location.pathname,
                  })}`
                ),
            },
          ]
        )
      );
      return;
    }
    dispatch(onWishlist(id));
  };
  const onAddToCart = async () => {
    if (!user) {
      dispatch(
        setAlert("Login required", "you need to login to add product to cart", [
          {
            title: "Login",
            onClick: () =>
              router.push(
                `/auth/signin?${QueryString.stringify({
                  redirectUrl: location.pathname,
                })}`
              ),
          },
        ])
      );
      return;
    }
    if (product.hasVariants) {
      if (!product.selectedVariant) {
        alert("Select variant first !");
        return;
      }
      console.log(product.selectedVariant);
      dispatch(addToCart(product.id, 1, product.selectedVariant.id));
      return;
    }
    dispatch(addToCart(product.id, 1));
  };

  const buttonActions = (
    <Box className={classes.buttonActions}>
      <Box>
        <Button
          variant="contained"
          color="primary"
          // size="large"
          fullWidth
          onClick={onAddToCart}
          className={classes.addToCartButton}
        >
          <Box display="flex" alignItems="center">
            <Box mr={2} display="flex" alignItems="center">
              <ShoppingCart />
            </Box>
            <Typography variant="button">Add to Cart</Typography>
          </Box>
        </Button>
      </Box>
      <Box m={1}>
        <Button variant="outlined" onClick={handleWishlist}>
          <Box display="flex" alignItems="center" fontSize="0.7rem">
            <Box mr={1} display="flex" alignItems="center">
              <FavoriteBorder
                color={user?.wishlist?.includes(id) ? "secondary" : "default"}
              />
            </Box>
            <Typography variant="button">
              {user?.wishlist?.includes(id) ? "Wishlisted" : "Wishlist"}
            </Typography>
          </Box>
        </Button>
      </Box>
    </Box>
  );

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box p={2}>
            <Grid item container spacing={1} xs={12}>
              <Grid item xs={12}>
                <Slider
                  dots
                  arrows
                  nextArrow={<NavigateNext color="disabled" />}
                  prevArrow={<NavigateBefore color="disabled" />}
                  infinite
                  speed={500}
                  slidesToShow={1}
                  slidesToScroll={1}
                  adaptiveHeight
                  lazyLoad
                >
                  {product.images && product.images.length > 0 ? (
                    product.images.map((url) => (
                      <div className={classes.imageDiv} key={url}>
                        <img
                          src={url}
                          alt={product.title}
                          className={classes.image}
                        />
                      </div>
                    ))
                  ) : (
                    <div className={classes.imageDiv}>No images !</div>
                  )}
                </Slider>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box p={2} className={classes.details}>
            <Typography variant="h5">{product.title}</Typography>
            <Typography className={classes.description} variant="h6">
              {product.description}
            </Typography>
            <Divider />
            {product.hasVariants && product.selectedVariant ? (
              <Pricing {...product.selectedVariant.price} />
            ) : (
              <Pricing {...product.price} />
            )}

            {product.hasVariants && (
              <Box>
                <Box pb={1}>
                  <Typography variant="button">select variant :</Typography>
                </Box>
                <VariantsList variants={product?.variants} />
              </Box>
            )}
            {product.hasVariants ? (
              product.selectedVariant &&
              (product.selectedVariant.stock < 10 ? (
                <Typography variant="body1" color="secondary">
                  hurry up only {product.selectedVariant.stock} left !
                </Typography>
              ) : (
                <Typography variant="body1" style={{ color: "green" }}>
                  in stock !
                </Typography>
              ))
            ) : product.stock < 10 ? (
              <Typography variant="body1" color="secondary">
                hurry up only {product.stock} left !
              </Typography>
            ) : (
              <Typography variant="body1" style={{ color: "green" }}>
                in stock !
              </Typography>
            )}
            {buttonActions}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  description: {
    color: "grey",
    textTransform: "capitalize",
    fontWeight: "normal",
  },
  imageDiv: {
    maxHeight: "80vh",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "60vh",
    minHeight: "480px",
    objectFit: "contain",
  },
  buttonActions: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    padding: theme.spacing(1, 0),
    // fontSize: "0.8rem",
  },
  addToCartButton: {
    padding: theme.spacing(1.5),
  },
}));

export default ProductDetails;
