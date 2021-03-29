import express, { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import { NotFoundError, requireAuth } from "@fibimarket/common";

import { Product, ProductDoc } from "../../models/product";
import { Category } from "../../models/category";
import { Location } from "../../models/location";

import { getChildrenIds } from "../../helpers"

export const getProductsController = async (req: Request, res: Response) => {
	const { category, location, vendor } = req.query;
	let filterQuery: FilterQuery<ProductDoc> = {};

	console.log(req.query);
	if (category) {
		const categories = await Category.find();
		const categoryDoc = await Category.findById(category);
		if (categoryDoc) {
			const categoryIds = [...getChildrenIds(categories, categoryDoc.id), categoryDoc.id];
			filterQuery.category = { $in: categoryIds };
		}
	}

	if (location) {
		const locations = await Location.find();
		const locationDoc = await Location.findById(location);
		if (locationDoc) {
			const locationIds = [...getChildrenIds(locations, locationDoc.id), locationDoc.id];
			filterQuery.location = { $in: locationIds };
		}
	}

	if (vendor) {
		filterQuery.vendor = { $eq: vendor.toString() }
	}

	const products = await Product.find(filterQuery);

	res.status(200).json(products);
}
