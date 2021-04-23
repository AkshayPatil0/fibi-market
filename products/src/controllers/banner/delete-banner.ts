import { Request, Response } from "express";
import { NotFoundError } from "@fibimarket/common";
import { deleteChildren } from "../../helpers";
import { Banner } from "../../models/banner";

export const deleteBannerController = async (req: Request, res: Response) => {
  const banner = await Banner.findById(req.params.id);

  if (!banner) throw new NotFoundError("banner");

  await banner.delete();

  res.send({});
};
