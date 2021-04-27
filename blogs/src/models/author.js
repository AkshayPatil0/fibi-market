"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_update_if_current_1 = require("mongoose-update-if-current");
var authorSchema = new mongoose_1.default.Schema({
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
    avatar: String,
    phoneNo: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});
authorSchema.set("versionKey", "version");
authorSchema.plugin(mongoose_update_if_current_1.updateIfCurrentPlugin);
authorSchema.statics.build = function (attrs) {
    return new Author(attrs);
};
var Author = mongoose_1.default.model("authors", authorSchema);
exports.Author = Author;
