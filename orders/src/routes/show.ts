import express, {Request, Response}from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@fibimarket/common';

import { Order } from '../models/order';

const router = express.Router();


router.get("/api/order/:id", requireAuth, async (req: Request, res: Response) => {

	const order = await Order.findById(req.params.id).populate("products")

	if(!order){
		throw new NotFoundError("order");
	}

	if(order.userId !== req.currentUser!.id){
		throw new NotAuthorizedError();
	}


	res.status(200).json(order)
})


export { router as showOrderRoute };