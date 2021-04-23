import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export interface BannerAttrs {
  title?: string;
  cover: string;
  category?: string;
  location?: string;
}

interface BannerModel extends mongoose.Model<BannerDoc> {
  build(attrs: BannerAttrs): BannerDoc;
}

export interface BannerDoc extends mongoose.Document {
  title: string;
  cover: string;
  category: string;
  location: string;
}

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    cover: {
      type: String,
      required: true,
    },
    category: String,
    location: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

bannerSchema.set("versionKey", "version");
bannerSchema.plugin(updateIfCurrentPlugin);

bannerSchema.statics.build = (attrs: BannerAttrs) => {
  return new Banner(attrs);
};

const Banner = mongoose.model<BannerDoc, BannerModel>("banners", bannerSchema);

export { Banner };
