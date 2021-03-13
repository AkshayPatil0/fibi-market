import express, { Request, Response } from 'express';
import { requireAuth, OrderStatus } from '@fibimarket/common';
import { Order, OrderDoc } from '../models/order';
import { FilterQuery } from 'mongoose';

const router = express.Router();

router.get("/api/myorders",
	requireAuth,
	async (req: Request, res: Response) => {

		const orders = await Order
			.find({ userId: req.currentUser!.id, status: { $not: { $eq: OrderStatus.cart } } })
			.populate({
				path: 'products',
				populate: {
					path: 'product',
					model: 'products'
				}
			});

		res.status(200).json(orders)
	}
)

router.get("/api/orders",
	requireAuth,
	async (req: Request, res: Response) => {

		const { userId, status } = req.query;
		var orderFilter: FilterQuery<OrderDoc> = {}

		if (userId) {
			orderFilter.userId = { $eq: userId.toString() }
		}

		if (status && Object.values(OrderStatus).includes(<any>status)) {
			orderFilter.status = { $eq: (<any>OrderStatus)[status.toString()] }
		}

		const orders = await Order
			.find(orderFilter)
			.populate({
				path: 'products',
				populate: {
					path: 'product',
					model: 'products'
				}
			});

		res.status(200).json(orders)
	}
)

export { router as getOrdersRoute }