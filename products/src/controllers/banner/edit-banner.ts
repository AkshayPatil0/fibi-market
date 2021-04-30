import { Request, Response } from "express";
import { Banner } from "../../models/banner";
import { deleteFromAWS, NotFoundError, uploadToAWS } from "@fibimarket/common";
import { v1 } from "uuid";

export const editBannerController = async (req: Request, res: Response) => {
  const { title, location, category } = req.body;

  const banner = await Banner.findById(req.params.id);

  if (!banner) {
    return new NotFoundError("banner");
  }

  let newCover: string | undefined = undefined;
  if (req.file) {
    const key = banner.cover.split(".com/").slice(-1)[0];
    await deleteFromAWS(key);
    const fileType = req.file.originalname.split(".").slice(-1)[0];
    const newKey = `banners/${v1()}.${fileType}`;
    newCover = await uploadToAWS(newKey, req.file.buffer);
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
