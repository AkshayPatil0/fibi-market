import React from "react";
import {
  Box,
  Button,
  Typography,
  CardContent,
  CardMedia,
  makeStyles,
} from "@material-ui/core";
import Pricing from "../../common/pricing";
import * as defaultImage from "../../../assets/images/image.png";

function OrderListItem({ order }) {
  const classes = useStyles();

  return (
    <Box display="flex" flexWrap="wrap" p={1}>
      <Box className={classes.products}>
        {order.orders?.map(({ product, quantity }) => {
          return (
            <Box mt={1} mb={1} key={product.id}>
              <div className={classes.root}>
                <CardContent className={classes.content}>
                  <CardMedia
                    className={classes.media}
                    image={product.images ? product.images[0] : defaultImage}
                    title={product.title}
                  />
                  <div className={classes.details}>
                    <Typography component="h6" variant="body1">
                      {product.title}
                    </Typography>
                    <Pricing {...product.price} small />
                    <Box flex="1" />
                    <Typography
                      component="p"
                      variant="subtitle2"
                      color="textSecondary"
                      className={classes.quantityText}
                    >
                      {quantity}
                    </Typography>
                  </div>
                </CardContent>
              </div>
            </Box>
          );
        })}
      </Box>
      <Box ml="auto">
        <Button variant="contained" color="secondary">
          Cancel order
        </Button>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},
  details: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(0, 2),
  },
  content: {
    display: "flex",
    padding: theme.spacing(1),
  },
  media: {
    padding: 10,
    minWidth: theme.spacing(15),
    minHeight: theme.spacing(15),
    backgroundSize: "contain",
  },
  quantity: {
    display: "flex",
    alignItems: "center",
  },
  iconButton: {
    padding: theme.spacing(0.5),
  },
  quantityText: {
    padding: theme.spacing(0.5),
  },
  controls: {
    display: "flex",
    alignItems: "center",
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default OrderListItem;
