import React, { useState } from "react";
import { Button, Grid, Box, Typography, Card, CardContent, IconButton, CardMedia, makeStyles, TextField, CardActions, Divider, InputBase } from "@material-ui/core";
// import Input from "../common/input";
import { useProductHook } from "./product-hook";
import { useHistory } from "react-router";

import { Delete } from "@material-ui/icons"
import Input from "../common/input";

import { AddCircle, RemoveCircle } from "@material-ui/icons";
import { useDispatch } from "react-redux";

import { addToCart, removeFromCart } from '../../store/actions/product'

function ProductListItem({ product, quantity }) {

	const classes = useStyles();

	// const { addToCart, deleteProduct } = useProductHook();

	const router = useHistory();
	const dispatch = useDispatch();

	const onAdd = async () => {
		await dispatch(addToCart(product.id, 1))
	}

	const onRemove = async () => {
		if (quantity < 2) return
		await dispatch(removeFromCart(product.id, 1));
	}
	// const handleChange = (e) => {
	// 	if (e.target.value > 0) {
	// 		setFormData({ [e.target.name]: e.target.value });
	// 	} else {
	// 		setQuantity("");
	// 	}
	// };

	return (
		<div className={classes.root} >
			{/* <div className={classes.details}> */}
			<CardContent className={classes.content}>
				<CardMedia
					className={classes.media}
					image={product.images ? product.images[0] : "https://fibimarket-dev.s3.ap-south-1.amazonaws.com/users/6048a2ed81735b0fd86b1292.jpeg"}
					title={product.title}
				/>
				<div className={classes.details}>

					<Typography component="h6" variant="body1">
						{product.title}
					</Typography>
					<Typography variant="subtitle2" color="textSecondary">
						{`₹ ${product.price}`}
					</Typography>
					<Box flex="1" />
					<div className={classes.quantity}>
						<IconButton className={classes.iconButton} onClick={onRemove}>
							<RemoveCircle />
						</IconButton>
						<Typography component="p" variant="subtitle2" color="textSecondary" className={classes.quantityText}>
							{quantity}
						</Typography>
						<IconButton className={classes.iconButton} onClick={onAdd}>
							<AddCircle />
						</IconButton>
					</div>
				</div>
				<Delete color="error" />
			</CardContent>
		</div>
	);
}

const useStyles = makeStyles((theme) =>
({
	root: {},
	details: {
		flex: "1",
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(0, 2)
	},
	content: {
		display: "flex",
		padding: theme.spacing(1)
	},
	media: {
		padding: 10,
		minWidth: theme.spacing(15),
		minHeight: theme.spacing(15)
	},
	quantity: {
		display: 'flex',
		alignItems: 'center'
	},
	iconButton: {
		padding: theme.spacing(0.5)
	},
	quantityText: {
		padding: theme.spacing(0.5),
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
	},
	playIcon: {
		height: 38,
		width: 38,
	},
}),
);



export default ProductListItem;
