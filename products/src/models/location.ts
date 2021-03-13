import mongoose from "mongoose";

export interface LocationAttrs {
  title: string;
  parent: string;
  slug: string;
}

interface LocationModel extends mongoose.Model<LocationDoc> {
  build(attrs: LocationAttrs): LocationDoc;
}

export interface LocationDoc extends mongoose.Document {
  title: string;
  parent: string;
  slug: string;
}

const locationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "locations",
    },
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

locationSchema.statics.build = (attrs: LocationAttrs) => {
  return new Location(attrs);
};

const Location = mongoose.model<LocationDoc, LocationModel>(
  "locations",
  locationSchema
);

export { Location };
