"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var blogSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "authors",
        required: true,
    },
    relevances: {
        type: Object,
        default: {},
    },
    images: {
        type: [String],
        default: [],
    },
    cover: String,
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    },
});
blogSchema.statics.build = function (attrs) {
    return new Blog(attrs);
};
var Blog = mongoose_1.default.model("blogs", blogSchema);
exports.Blog = Blog;
