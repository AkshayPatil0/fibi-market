import express, {Request, Response} from 'express';

import { OrderStatus } from '@fibimarket/common';
import { Order } from '../../models/order';
const router = express.Router();


router.get("/api/orders/cart",
async (req: Request, res: Response) => {

	const cart = await Order.findOne({userId: req.currentUser!.id, status: OrderStatus.cart})
		.populate({
			path: 'products',
			populate: {
				path: 'product',
				model: 'products'
			}
		})

	res.status(200).json(cart)
}
)

export { router as getCartRoute }