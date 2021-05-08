import { Request, Response } from "express";
import mongoose from "mongoose";
import { Banner } from "../../models/banner";
import { v1 } from "uuid";
import {
  BadRequestError,
  NotFoundError,
  uploadToAWS,
} from "@fibimarket/common";

export const createBannerController = async (req: Request, res: Response) => {
  const { title, location, category } = req.body;

  if (!req.file) {
    throw new BadRequestError("Cover image not provided !");
  }

  // const fileType = req.file.originalname.split(".").slice(-1)[0];
  // const key = `banners/${v1()}.${fileType}`;

  // const cover = await uploadToAWS(key, req.file.buffer);

  const cover = "/api/products/" + req.file.path;

  const banner = Banner.build({
    title,
    cover,
    location,
    category,
  });

  await banner.save();

  res.status(201).json(banner);
};
