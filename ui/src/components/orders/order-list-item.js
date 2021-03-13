import React, { useState } from "react";
import {
	Box,
	Button,
	Typography,
	Card,
	CardContent,
	CardMedia,
	CardActions,
	makeStyles,
	Divider,
} from "@material-ui/core";

function OrderListItem({ order }) {
	const classes = useStyles();

	return (
		<Card>
			<CardContent className={classes.products}>
				{order.products.map(({ product, quantity }) => {
					return (
						<Box mt={1} mb={1} key={product.id}>
							<div className={classes.root}>
								{/* <div className={classes.details}> */}
								<CardContent className={classes.content}>
									<CardMedia
										className={classes.media}
										image={
											product.images
												? product.images[0]
												: "https://fibimarket-dev.s3.ap-south-1.amazonaws.com/users/6048a2ed81735b0fd86b1292.jpeg"
										}
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
							<Divider />
						</Box>
					);
				})}
			</CardContent>
			<CardActions>
				<Box ml="auto">
					<Button variant="contained" color="secondary">
						Cancel order
					</Button>
				</Box>
			</CardActions>
		</Card>
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
