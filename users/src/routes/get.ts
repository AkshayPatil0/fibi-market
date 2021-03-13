import express from "express";
import { currentUser, requireAuth, UserRoles } from "@fibimarket/common";
import { User, UserDoc } from "../models/user";
import { FilterQuery } from "mongoose";

const router = express();

router.get("/api/users", currentUser, async (req, res) => {

	const { role, email } = req.query;

	var userFilter: FilterQuery<UserDoc> = {};

	if (role && Object.values(UserRoles).includes(<any>role)) {
		userFilter.role = { $eq: (<any>UserRoles)[role.toString()] };
	}

	if (email) {
		const re = `.*(${email}).*`;
		userFilter.email = { $regex: new RegExp(re) }
	}

	const users = await User.find(userFilter);

	res.status(200).json(users);
});

export { router as getUsersRoute };
