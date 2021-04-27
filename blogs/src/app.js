"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = require("body-parser");
require("express-async-errors");
var cookie_session_1 = __importDefault(require("cookie-session"));
var morgan_1 = __importDefault(require("morgan"));
var common_1 = require("@fibimarket/common");
var blog_1 = require("./routes/blog");
var app = express_1.default();
exports.app = app;
app.use(body_parser_1.json());
app.set("trust proxy", true);
app.use(cookie_session_1.default({
    signed: false,
    // secure: process.env.NODE_ENV !== "test",
}));
app.use(morgan_1.default("dev"));
app.use(common_1.currentUser);
app.use("/api/blogs", blog_1.blogRoutes);
app.all("*", function () {
    throw new common_1.NotFoundError("route");
});
app.use(common_1.errorHandler);
