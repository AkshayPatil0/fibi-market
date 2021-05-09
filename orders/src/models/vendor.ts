import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export interface VendorAttrs {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface VendorModel extends mongoose.Model<VendorDoc> {
  build(attrs: VendorAttrs): VendorDoc;
}

export interface VendorDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  version: number;
}

const vendorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: String,
    email: {
      type: String,
      required: true,
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

vendorSchema.set("versionKey", "version");
vendorSchema.plugin(updateIfCurrentPlugin);

vendorSchema.statics.build = (attrs: VendorAttrs) => {
  return new Vendor(attrs);
};

const Vendor = mongoose.model<VendorDoc, VendorModel>("vendors", vendorSchema);

export { Vendor };
