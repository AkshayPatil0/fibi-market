import { Request, Response } from "express";
import { Banner } from "../../models/banner";

export const getBannersController = async (req: Request, res: Response) => {
  const banners = await Banner.find();

  res.status(200).json(banners);
};
