import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { BadRequestError, NotFoundError } from "@fibimarket/common";
import { Product } from "../../models/product";

export const getProductControlller = async (req: Request, res: Response) => {

	if (!(req.params.id && mongoose.Types.ObjectId.isValid(req.params.id))) {
		throw new BadRequestError("Product id is not valid !")
	}

	const product = await Product.findById(req.params.id);

	if (!product) {
		throw new NotFoundError("product");
	}

	res.status(200).json(product);

	return product;
}