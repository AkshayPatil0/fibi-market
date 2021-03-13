import express, {Request, Response} from 'express';

import { NotFoundError, OrderStatus } from '@fibimarket/common';
import { Product } from '../../models/product';
import { Order } from '../../models/order';
const router = express.Router();


router.post('/api/orders/cart/remove',
async (req: Request, res: Response) => {
	const {productId, quantity} = req.body;

	const product = await Product.findById(productId);

	if(!product){
		throw new NotFoundError("product");
	}

	const cart = await Order.findOne({userId: req.currentUser!.id, status: OrderStatus.cart})
		.populate({
			path: 'products',
			populate: {
				path: 'product',
				model: 'products'
			}
		});

	if(!cart){
		const newOrder = Order.build({
			userId: req.currentUser!.id,
			products: [],
			totalCost: 0,
			status: OrderStatus.cart
		})

		await newOrder.save()
		return res.status(201).json(newOrder)
	}

	let products = []
	products = cart.products.map((val) => {
		if(val.product.id === productId) {
			if(val.quantity - quantity > 0){
				return {product: val.product, quantity: val.quantity - quantity}
			}
			return undefined;
		}
		return val;
	})

	cart.set('products', products.filter(val => val));
	cart.set('totalCost', cart.totalCost - product.price*quantity);
	
	await cart.save();

	res.status(200).json(cart);

}
)

export { router as removeFromCartRoute }