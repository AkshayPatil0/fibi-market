import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

import { UserRoles } from "@fibimarket/common";
import { Password } from "../services/password";

//type definition of user attributes
export interface UserAttrs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  addresses?: {
    name: string;
    phone: string;
    address: string;
    locality: string;
    pincode: string;
    city: string;
    state: string;
  }[];
  wishlist?: string[];
  phoneNo?: string;
  avatar?: string;
  role: UserRoles;
}
//type definition of user model
export interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//type definition of user document
export interface UserDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  addresses: {
    name: string;
    phone: string;
    address: string;
    locality: string;
    pincode: string;
    city: string;
    state: string;
  }[];
  rewardPoints: number;
  quizes: {
    id: string;
    points: number;
  }[];
  wishlist: string[];
  phoneNo: string;
  avatar: string;
  role: UserRoles;
  version: number;
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: String,
    phoneNo: {
      type: String,
    },
    addresses: [Object],
    rewardPoints: {
      type: Number,
      default: 0,
    },
    quizes: [Object],
    wishlist: [String],
    role: {
      type: String,
      required: true,
      enum: Object.values(UserRoles),
    },
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.set("versionKey", "version");
userSchema.plugin(updateIfCurrentPlugin);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hash = await Password.toHash(this.get("password"));
    this.set("password", hash);
  }
  // done()
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User({ ...attrs, role: attrs.role?.toString() || UserRoles.user });
};

const User = mongoose.model<UserDoc, UserModel>("users", userSchema);

export { User };
