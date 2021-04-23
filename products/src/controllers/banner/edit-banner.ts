import { Request, Response } from "express";
import { Banner } from "../../models/banner";
import { NotFoundError, uploadToAWS } from "@fibimarket/common";

export const editBannerController = async (req: Request, res: Response) => {
  const { title, location, category } = req.body;

  const banner = await Banner.findById(req.params.id);

  if (!banner) {
    return new NotFoundError("banner");
  }

  let newCover: string | undefined = undefined;
  if (req.file) {
    const key = req.body.uri.split(".com/").slice(-1)[0];
    newCover = await uploadToAWS(key, req.file.buffer);
  }

  banner.set({
    ...JSON.parse(JSON.stringify(banner)),
    title,
    cover: newCover || banner.cover,
    location,
    category,
  });

  await banner.save();

  res.status(201).json(banner);
};
